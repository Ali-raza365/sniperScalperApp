Settings-style list row — peach Material icon, 18px label, trailing chevron or a control (pass `<Toggle/>` as children). Stack inside `<Card>` with `divider` on rows 2+.

```jsx
<Card size="sm">
  <ListRow icon="notifications" label="Signal Alerts" trailing="none"><Toggle defaultChecked /></ListRow>
  <ListRow icon="info" label="About Us" divider />
</Card>
```
