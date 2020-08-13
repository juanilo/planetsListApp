# Planets List App:
This App consumes SWAPI endpoint and the particular resource: 

https://swapi.dev/documentation#planets

Basically allows to see 10 planets per page, advance and go back, seeing info per planet and the total, partial and count of total results, 
order by all the fields available per planet.
The Angular service it is implemented from the scratch and allows to consume the rest of the resources available at SWAPI. 
The current app is only consuming "planets", to add more resources justy need to add an object with the configuration to the resource Array :
[planetsListApp\src\app\services\sw.service.js:23](https://github.com/juanilo/planetsListApp/blob/master/src/app/services/sw.service.js#L23)

```
{
    type : 'resourceName',
    sorts : [ 'name', 'type', 'etc' ],
    defaultSort : 1, // this element define the default sort to apply on first load 
    url : 'resourceUri/'
}
```
__current status of the implementation__ : 
 -1st partial _(8/3/2020)_ 
 -2nd partial _(8/13/2020)_ 
 
## Instructions: 

In order to run it locally just : 

```
git clone https://github.com/juanilo/planetsListApp.git
cd planetsListApp
gulp serve
```
