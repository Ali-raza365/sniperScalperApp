#property copyright "Sniper Scalper"
#property version   "1.00"
#property description "Posts MT5 deals to the Sniper Scalper ingest server"

input string InpServerUrl = "http://127.0.0.1:8787";
input string InpApiKey    = "sniper-scalper-dev-key";

int OnInit()
{
   if(!TerminalInfoInteger(TERMINAL_TRADE_ALLOWED))
      Print("SniperScalperBridge: trading is disabled in the terminal");
   return(INIT_SUCCEEDED);
}

void OnDeinit(const int reason)
{
}

void OnTradeTransaction(const MqlTradeTransaction &trans,
                        const MqlTradeRequest &request,
                        const MqlTradeResult &result)
{
   if(trans.type != TRADE_TRANSACTION_DEAL_ADD)
      return;
   if(trans.deal == 0)
      return;

   if(!HistoryDealSelect(trans.deal))
      return;

   const long dealType = HistoryDealGetInteger(trans.deal, DEAL_TYPE);
   if(dealType != DEAL_TYPE_BUY && dealType != DEAL_TYPE_SELL)
      return;

   const long entry = HistoryDealGetInteger(trans.deal, DEAL_ENTRY);
   const bool isClose = (entry == DEAL_ENTRY_OUT || entry == DEAL_ENTRY_OUT_BY);

   string side = dealType == DEAL_TYPE_SELL ? "SELL" : "BUY";
   if(isClose)
      side = dealType == DEAL_TYPE_BUY ? "SELL" : "BUY";

   const long ticket = HistoryDealGetInteger(trans.deal, DEAL_POSITION_ID);
   const string symbol = HistoryDealGetString(trans.deal, DEAL_SYMBOL);
   const double volume = HistoryDealGetDouble(trans.deal, DEAL_VOLUME);
   const double price = HistoryDealGetDouble(trans.deal, DEAL_PRICE);
   const string comment = HistoryDealGetString(trans.deal, DEAL_COMMENT);
   const datetime dealTime = (datetime)HistoryDealGetInteger(trans.deal, DEAL_TIME);
   const double profit = HistoryDealGetDouble(trans.deal, DEAL_PROFIT);

   double sl = 0;
   double tp = 0;
   if(PositionSelectByTicket(ticket))
   {
      sl = PositionGetDouble(POSITION_SL);
      tp = PositionGetDouble(POSITION_TP);
   }

   PostSignal(ticket, symbol, side, volume, price, sl, tp, comment, dealTime, isClose ? "closed" : "open", profit);
}

void PostSignal(const long ticket,
                const string symbol,
                const string side,
                const double volume,
                const double price,
                const double sl,
                const double tp,
                const string comment,
                const datetime openedAt,
                const string status,
                const double profit)
{
   const string url = InpServerUrl + "/signals";
   const string iso = TimeToString(openedAt, TIME_DATE | TIME_SECONDS);
   string body = "{";
   body += "\"ticket\":" + IntegerToString(ticket) + ",";
   body += "\"symbol\":\"" + symbol + "\",";
   body += "\"side\":\"" + side + "\",";
   body += "\"volume\":" + DoubleToString(volume, 2) + ",";
   body += "\"price\":" + DoubleToString(price, _Digits) + ",";
   body += "\"sl\":" + DoubleToString(sl, _Digits) + ",";
   body += "\"tp\":" + DoubleToString(tp, _Digits) + ",";
   body += "\"comment\":\"" + EscapeJson(comment) + "\",";
   body += "\"openedAt\":\"" + iso + "\",";
   body += "\"status\":\"" + status + "\",";
   body += "\"profit\":" + DoubleToString(profit, 2);
   body += "}";

   char post[];
   char result[];
   string resultHeaders;
   StringToCharArray(body, post, 0, WHOLE_ARRAY, CP_UTF8);
   ArrayResize(post, ArraySize(post) - 1);

   string headers = "Content-Type: application/json\r\n";
   headers += "x-api-key: " + InpApiKey + "\r\n";

   const int timeout = 5000;
   ResetLastError();
   const int code = WebRequest("POST", url, headers, timeout, post, result, resultHeaders);
   if(code == -1)
      Print("SniperScalperBridge WebRequest failed: ", GetLastError(), " — allow ", InpServerUrl, " in Tools > Options > Expert Advisors");
   else
      Print("SniperScalperBridge POST ", code, " ", CharArrayToString(result));
}

string EscapeJson(const string value)
{
   string out = value;
   StringReplace(out, "\\", "\\\\");
   StringReplace(out, "\"", "\\\"");
   StringReplace(out, "\n", " ");
   StringReplace(out, "\r", " ");
   return out;
}
