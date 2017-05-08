`StockContainer` (component)
============================

React component represents Stock container
Display stock fetched from Stock API

Props
-----

### `data`

object of data from response

type: `object`


### `exchange`

name of stock exchange market

type: `string`


### `isFetched`

is stock fetched

type: `bool`


### `isFetching`

is stock fetching

type: `bool`


### `symbol`

symbol of stock

type: `string`


### `title`

name of corp

type: `string`


Methods
-------

### `getStock`
Parse stock points from response to draw on graph


### `renderRange`
Parse low, high , close values of stock


