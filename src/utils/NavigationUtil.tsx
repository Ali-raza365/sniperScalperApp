import {
  createNavigationContainerRef,
  CommonActions,
  StackActions,
} from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export async function navigate<Name extends keyof RootStackParamList>(
  routeName: Name,
  params?: RootStackParamList[Name],
) {
  await navigationRef.isReady();
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate({ name: routeName, params }));
  }
}

export async function resetAndNavigate(routeName: keyof RootStackParamList) {
  await navigationRef.isReady();
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName }],
      }),
    );
  }
}

export async function goBack() {
  await navigationRef.isReady();
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.goBack());
  }
}

export async function push<Name extends keyof RootStackParamList>(
  routeName: Name,
  params?: RootStackParamList[Name],
) {
  await navigationRef.isReady();
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(routeName, params));
  }
}

export async function prepareNavigation() {
  await navigationRef.isReady();
}
