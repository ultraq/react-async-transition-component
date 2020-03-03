
react-async-transition-component
================================

A container for [react-async-component](https://github.com/ultraq/react-async-component)
for performing component transitions.


Installation
------------

```
npm install @ultraq/react-async-transition-component
```


Usage
-----

This component is intended to be used with `react-router` and
`react-transition-group`, when loading routes asynchronously with
`react-async-component`.  The addition of route transitions causes all sorts of
weird visual quirks when the async route to go to isn't prepared, ruining the
animated routing that you worked so hard to build!  This is where this component
comes to play, acting as a drop-in replacement of `react-async-component` in
these situations:

```javascript
<Route path="/payments/confirm" render={() => (
  <AsyncTransitionComponent className="route" transitionClassName={transitionClassName}
    loader={import('./MyRoute.js')}/>
)}/>
```

In the example above, there is a base class set using the `className` prop which
is always present on a `<div>` that will contain the incoming component.  Upon
loading of the incoming component from the `loader` prop, `transitionClassName`
(as supplied by `react-dynamic-router`) is added to the container.  This delay
of applying the transition class helps create a smoother transition from one
route/component to the next.

### Props

Any props not mentioned below are passed along to the component that is loaded.

 - `className`: a CSS class to apply to a container `<div>`.
 - `transitionClassName`: a CSS class applied to the container once the
   component in `loader` has finished loading.  This class typically initiates
   a transition/animation.
 - `loader`: required, the code through which a component will be loaded.  In
   the example above we used dynamic imports, but this can be any code that
   returns a Promise of the loaded component.
