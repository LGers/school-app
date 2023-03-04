## Project Architecture
```
src/
|__api/
|   |__auth.ts
|   |__<api_routes.ts>/
|
|__AppRoutes
|   |__AppRoutes.ts
|   |__ProtectedRoutes.ts/
|
|__compoments/
|   |__MyButton/
|   |__<Component>/
|       |__index.ts
|       |__Component.tsx
|       |__Component.types.ts
|       |__Component.module.scss
|       |__...
|__|pages/
|     |__Auth/
|     |__Main/
|     |__Page404/
|     |__<FeaturePage>/
|     |__...
|
|__redux/
|   |__auth/
|       |__auth.slice.ts
|       |__auth.thunk.ts
|       |__auth.types.ts
|   |__<reduxComponent>/
|       |__reduxComponent.slice.ts
|       |__reduxComponent.thunk.ts
|       |__reduxComponent.types.ts
|       |__...
|   |__store.ts
app.tsx
index.ts
```

---

## Components

< ComponentName.tsx >

```tsx
interface Props = {
  prop: PropType;
};

export function ComponentName(props: Props) {
  // Component logic here - for functions (hooks) which must uses inside the component)
  // For another logic - create separate module: Component.utils.ts
  return (
    <div>
      Component
    </div>
  );
}
```
---

## Pages
< PageName.tsx >

```tsx
export function PageName() {
  // Page logic here - for functions (hooks) which must uses inside the component)
  // For another logic - create separate module: PageName.utils.ts
  return (
    <div>
      Page
    </div>
  );
}
```

## Redux

store.ts

```ts
import { authReducer } from './auth/auth.slice';
import { reducerName } from './auth/reducerName.slice';
import { <another>Reducer } from './auth/Another.slice';

export const store = configureStore({
  reducer: {
    reducerName: reducerName
    auth: authReducer,
    another: <another>Reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## reducers/slice

```tsx
const reducerNameSlice = createSlice({
    name: 'reducerName',
    initialState,
    reducers: {
      method(state, action) => {
        // slice/reducer logic
      }
    }
};
```

## api
examples

```ts
const URL = {
  signIn: () => 'signin',
  signUp: () => 'signup',
};

export const signIn = ({ login, password }: LoginInterface) => {
  return instance.post(URL.signIn(), {
    login,
    password,
  });
};

export const signUp = ({ name, login, password }: SignUpInterface) => {
  return instance.post(URL.signUp(), {
    name,
    login,
    password,
  });
};

```
---