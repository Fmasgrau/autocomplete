1.	The difference between PureComponent and Component is in the update state. Meanwhile a PureComponent will compare new State and props with old by valor, the component will use the reference. So for example if you are sending a object as props, the component will be rendered everytime the data changes  even if the object data is the same.

2.	I have never used Context as state management before but I think the problem here could be you are using two method to re-render the components. It will cause performance problems.

3.	1. State management
    2. Via render props

4.  You can use React.Memo, it’s not common o recommended for all situations but you can.
    You can use PureComponents.
    You can use a customHook which compares new data with old data.

5.  I don’t know how can I write the description but I used that to prevent some behaviors incoming from a div or other TAG and to wrap more than one element. When you create a new component and you want to return HTML , you need to wrap the whole HTML into a div or other TAG if you have more than one element , if you don't do that you will have an error. If you want to avoid the styiling from the div or an error you can wrap those tags into a fragment.
You can use React.Fragment o <></>

6. The state management uses HOC to provide data to all components
A HOC is a functional component which transform a component in other component. You will put a component inside other component a return a new one.


7. With async...await you should use try catch to get the rejection value of the async function, in a promise you have the catch method to get the rejection value and in a callback the errors are handled as arguments of the callback using the pattern error-first callback

8. setState can take two arguments, the first one can be an object or a function that returns the updated state and the second one is an optional callback  that will be called once setState is completed and the component is re rendered. It is async because if it were sync, the props are not so you won't be able to know the props until you re-render the parent component.

9.  Class "Whatever" extends React.Component to => const function = () => { return (<></>)}
    You may remove the render method from the class, just only return the HTML
    You need to remove the constructor
    You will use useState, useEffect or other methods instead of lifecycle events. So, remove those.


10. You can use inline styles.
    Styled components.
    Styles like in the JS, CSS, and HTML common pattern.
    Styling libraries such bootstrap, material UI.

11. I have never done before but I think creating an axios call, then when I received that I set the state, and I will have a conditional rendering depends on if I receive data or not

