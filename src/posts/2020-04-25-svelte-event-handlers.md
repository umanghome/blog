---
layout: post
title:  "Event Handlers and Svelte"
date:   2020-04-25 00:40:00
categories: [software, javascript]
comments: true
keywords: [javascript, svelte, event, handlers, listeners]
excerpt: Svelte makes writing event handlers fun. Let's see how.
---

[Svelte](https://svelte.dev) is a framework for building frontend apps. I'm a huge fan of Svelte, mostly because it lets me do a lot of things with relatively fewer and less convoluted code. One of things that enable simpler code is how it lets you write event handlers. Let's talk about it.

This post has some [basics](#basics) and some [cool things that I found](#cool-things). If you've already written your fair share of code, you might want to skip to the [latter](#cool-things).

# Basics

Event listeners are just regular functions like the ones you would use with React or with Vanilla JS. They get an event as the argument and let you do whatever you would want to.

A key different with React is that with Svelte, you don't pass the event listeners down from the parent to the child. Instead, you _dispatch_ events from children to parents. You still can pass event listeners to children as props if that's what you want to do, but the recommended patterns is dispatching events from children. I like Svelte's pattern better since I don't have to worry about setting a [`no-op`](https://en.wikipedia.org/wiki/NOP_(code)#JavaScript) function as the default value of an `onEvent` prop.

## `on:eventname`

You add event listeners on a component using the `on:eventname` directive.

```html
<Button on:click={handleClick} />
```

You can use inline functions too.

```html
<Button on:click={() => doSomething()} />
```

## `on:eventname|modifier`

There's also something called a "modifier" that you can use with Svelte. They are mostly things you would set as behaviour of your event listener, or operations you usually do on the `event` argument.

Svelte supports the following modifiers:
- `preventDefault` (no more `event.preventDefault()`)
- `stopPropagation` (no more `event.stopPropagation()`)
- `passive`
- `capture`
- `once`
- `self`

```html
<Button on:click|preventDefault={handleClick} />
```

The preceding code would first call `event.preventDefault()` before invoking `handleClick(event)`. I really like this pattern, since it lets me define one function and use it regardless of whether it is being used as an event listener or being called independently. For example:

```html
<script>
  function updateDetails (event) {
    event && event.preventDefault();

    Notifier.notify('Updating details');
    Datastore.getCurrentStore().updateDetails();
  }

  function saveProfile () {
    // ...

    updateDetails();

    // ...
  }
</script>

<Button on:click={updateDetails}>Update Details</Button>
```

In the preceding code, I'd have to explicitly check for the presence of `event` and then call `preventDefault` on it just to ensure that clicking the `Button` doesn't do something weird. With modifiers this would become

```html
<script>
  function updateDetails () {
    Notifier.notify('Updating details');
    Datastore.getCurrentStore().updateDetails();
  }

  function saveProfile () {
    // ...

    updateDetails();

    // ...
  }
</script>

<Button on:click|preventDefault={updateDetails}>Update Details</Button>
```

## dispatch

We have discussed how to handle events. Let's talk about _dispatching_ events now.

Native DOM elements emit their regular events. With components, you would have to crate an event dispatcher and use that to dispatch your events. For this, you use the dispatcher returned by `createEventDispatcher`.

```js
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

dispatch(eventName, eventData);
```

Here's how you use it:

```html
<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function updateDetails () {
    Notifier.notify('Updating details');

    Datastore
      .getCurrentStore()
      .updateDetails()
      .then(details => {
        dispatch('updated', details);
      })
  }

  function saveProfile () {
    // ...

    updateDetails();

    // ...
  }
</script>

<Button on:click|preventDefault={updateDetails}>Update Details</Button>
```

The parent component can then listen to the `updated` event:

```html
<script>
  function handleUpdate (event) {
    const details = event.detail;

    // ...
  }
<script>

<Child on:updated={handleUpdated}>
```

Notice how we're getting the `eventData` using `event.detail`? Svelte internally uses a [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent). This makes the modifiers work even on custom, dispatched events!

## Forwarding Events

Hey, but what if I'm nested three levels down and I want to notify the parent that some event occured, without actually handling it?

Here's what I wrote when I didn't want to both reading the documentation:

`DetailsForm.svelte`
```html
<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function onSubmit (event) {
    dispatch('submit', event);
  }
</script>

<form on:submit={onSubmit}>
  // ...
</form>
```

`Profile.svelte`
```html
<script>
  import DetailsForm from './DetailsForm.svelte';

  function handleSubmit (event) {
    const actualEvent = event.detail; // Remember how this became a CustomEvent?

    const target = actualEvent.target;
  }
</script>

<DetailsForm on:submit={handleSubmit}>
  // ...
</form>
```

This got ugly and complicated because now I have to get the original event using `event.detail`. And what if I want to send this event one level up? Do I create an event dispatcher again? Ugh.

Well, not really. Here's how you actually do it.

`DetailsForm.svelte`
```html
<form on:submit>
  // ...
</form>
```

`Profile.svelte`
```html
<script>
  import DetailsForm from './DetailsForm.svelte';

  function handleSubmit (event) {
    const target = event.target;
  }
</script>

<DetailsForm on:submit={handleSubmit}>
  // ...
</form>
```

See how we `DetailsForm.svelte` suddenly became so clean? Turns out, if you don't give an event handler to `on:eventname`, it just sends it one level above. Without creating a CustomEvent. Neat. I don't have to deal with `event.detail` anymore.

> Read more about all of this at [Svelte's documentation](https://svelte.dev/docs#on_element_event).

# Cool things

## Handle and Forward events

What if, within my `DetailsForm.svelte`, I wanted to handle the submit event as well as forward it to the parent? One solution would be:

`DetailsForm.svelte`
```html
<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function handleSubmit (event) {
    // Handle the event
  }

  // The actual event listener
  function onSubmit (event) {
    handleSubmit(event);

    dispatch('submit', event);
  }
</script>

<form on:submit={onSubmit}>
  // ...
</form>
```

It's getting ugly again. Let's try using the forwarding directive _and_ the event listener directive at the same time.

```html
<script>
  function handleSubmit (event) {
    // Handle the event
  }
</script>

<form on:submit on:submit={handleSubmit}>
  // ...
</form>
```

This actually works. Having both `on:submit` and `on:submit={handleSubmit}` lets you handle the event inside the component as well as forward it - all without having to deal with `dispatch` and `CustomEvent`.

## Multiple Events

We were able to attach two `on:submit` directives to our form and still managed to keep things worked. But both of them did different things. Can we have multiple event listeners at same time? We can!

```html
<script>
  function handleSubmit (event) {
    // Handle the event
  }

  function showModal (event) {
    // Show some modal
  }
</script>

<form on:submit={handleSubmit} on:submit={showModal}>
  // ...
</form>
```

Both `handleSubmit` and `showModal` will now be invoked when the form dispatches a `submit` event. We could even take it up a notch and forward the event using the forwarding directive: `on:submit`. Try it out.

Note: This works for both native DOM events as well as any custom events dispatched manually. It's all the same to Svelte.