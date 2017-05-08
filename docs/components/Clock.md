`Clock` (component)
===================

React component that display current time at current location.
By parsing new Date() from browser.

Props
-----

### `title`

A text display current's user identity,
 "Nobody" if no one is detected in the background,
 "Hi, ..name" if an user is detected

type: `string`


Methods
-------

### `updateClock`
Update clock state with new time


### `getTime`
Parse current Date object
type: `undefined`


### `setTimer`
Update current clock for every 1 second


