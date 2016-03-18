### TODO: Présentation du module

#Installation
>Require :
* node
* npm

##Cloning sources and installation of Node modules
```bash
git clone https://github.com/coast-team/mute-demo
npm install
```

## Setup signaling server
This mute editor provides its own signaling server but you can use an external one by providing the server hostname and port as environment variable (`SIGNALING_SERVER_HOST`, `SIGNALING_SERVER_PORT`)

By default: `ws://localhost:8000` (you may use `ws://sigver-coastteam.rhcloud.com:8000`)

##DB installation

>Require :
* MongoDB 3.0.4

###DB configuration
```
mongo
> use mute
> db.createUser(
  {
    user: "mute",
    pwd: "mute",
    roles: [ { role: "userAdmin", db: "mute" } ]
  }
)
```
##Launch app
>In mute-demo folder

```
node app.js
```
#Architecture

#See also

* [**mute-client**](https://github.com/MatthieuNICOLAS/mute-client)
* [**mute-server**](https://github.com/MatthieuNICOLAS/mute-server)
* [**mute-structs**](https://github.com/MatthieuNICOLAS/mute-structs)
* [**mute-utils**](https://github.com/MatthieuNICOLAS/mute-utils)

## License

**mute-demo** is licensed under the GNU General Public License 3.

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with
this program. If not, see <http://www.gnu.org/licenses/>.

The documentation, tutorial and source code are intended as a community
resource and you can basically use, copy and improve them however you want.
Included works are subject to their respective licenses.
