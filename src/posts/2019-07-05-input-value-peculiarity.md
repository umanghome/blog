---
layout: post
title:  "Peculiarities of setting inputRef.value"
date:   2019-07-05 00:00:00
categories: [software, javascript]
comments: true
keywords: [javascript, input, value, onchange, oninput, event, change, input]
excerpt: With JavaScript, setting values on input elements programmatically doesn't trigger any events. This breaks apps. Let's talk about it.
---

If you've been writing vanilla JS for a while, you would have run into instances where you had to set values of input elements. The general pattern on going about doing this is setting the `value` property of the input element. However, there's an oddity around this that I, along with a friend, discovered last week.

With modern apps come modern libraries and frameworks. And usually in those libraries, things change based on the value of input fields. Things go smooth and as expected while operations are being performed within the purview of the library/framework. For example, a React component might set the value of a property in the state when an event is fired, and then use that value to set the input's value (a.k.a controlled inputs):
```jsx
<input onInput={e => this.setState({ name: e.target.value })} type="text" id="name" />
```

We happened to use [Svelte](https://svelte.dev) (v2) in one of our projects. It has a slightly different syntax(?), but would do something very similar to the React example above:
```html
<input bind:value=name type="text" id="name">
```
A gist of what's happening here: We have a property `name` in our state, whose value we're _binding_ to the input element. Now, every time the input element is changed, `name` is updated to the value. And any time the `name` property of the state is updated, the input's value changes. Like I said, very similar to the React example. Svelte generates code that adds a listener on `input` event, which updates the state.

Things are all good till this point, because all the getting/setting is happening from within the library's or the framework's runtime. However, what if some other script running on the page wanted to update the value of the input field? Ideally, they'd say
```js
document.querySelector('#name').value = 'John Doe';
```
When the script executes this, the visual value of the input field changes. But, the property in the state doesn't change. Why?

It's because setting the `value` property of the input element doesn't trigger any events. So there's no `input` or `change` that is fired. This doesn't trigger any listeners that would have updated the state and something in the application would have _reacted_ to the change in this value. The application's regular flow breaks.

So, in the light of this new information, how should one go about updating the value of an input field using just vanilla JS?

One (and I'd argue the most ideal) way would be to trigger the `input` and `change` event manually after setting the `value` property:
```js
const input = document.querySelector('#name');
input.value = 'John Doe';
input.dispatchEvent(new Event('input', { bubbles: true }));
input.dispatchEvent(new Event('change', { bubbles: true }));
```

Now that we know exactly what JS should be executed every time we want to update the value of an input element, why not abstract it out to a function,
```js
function updateInput (input, value) {
  input.value = value;
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
}
```
and then user that function every time we want to update an input field?
```js
updateInput(document.querySelector('#name'), 'John Doe');
```

Of course, this doesn't work with IE. But there are always [workarounds](https://stackoverflow.com/questions/26596123/internet-explorer-9-10-11-event-constructor-doesnt-work) that can help you make this work cross-browser.
