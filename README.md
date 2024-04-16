davida@Davids-MacBook-Pro ~ % curl http://192.168.7.122:8080/ccapi/ver100/shooting/settings/tv
{"message":"Mode not supported"}% davida@Davids-MacBook-Pro ~ % curl http://192.168.7.122:8080/ccapi/ver100/shooting/settings/iso
{"value":"100","ability":["auto","100","125","160","200","250","320","400","500","640","800","1000","1250","1600","2000","2500","3200","4000","5000","6400","8000","10000","12800","16000","20000","25600","32000","40000","51200"]}% davida@Davids-MacBook-Pro ~ % curl -vv http://192.168.7.122:8080/ccapi/ver100/shooting/settings/iso

- Trying 192.168.7.122:8080...
- Connected to 192.168.7.122 (192.168.7.122) port 8080 (#0)
  > GET /ccapi/ver100/shooting/settings/iso HTTP/1.1
  > Host: 192.168.7.122:8080
  > User-Agent: curl/8.1.2
  > Accept: _/_
  >
  > < HTTP/1.1 200 OK
  > < Content-Length:228
  > < Content-Type:application/json
  > <
- Connection #0 to host 192.168.7.122 left intact
  {"value":"100","ability":["auto","100","125","160","200","250","320","400","500","640","800","1000","1250","1600","2000","2500","3200","4000","5000","6400","8000","10000","12800","16000","20000","25600","32000","40000","51200"]}%
