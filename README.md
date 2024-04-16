curl http://192.168.7.122:8080/ccapi/ver100/shooting/settings/exposure
{"value":"+0.0","ability":["-3.0","-2_2\/3","-2_1\/3","-2.0","-1_2\/3","-1_1\/3","-1.0","-0_2\/3","-0_1\/3","+0.0","+0_1\/3","+0_2\/3","+1.0","+1_1\/3","+1_2\/3","+2.0","+2_1\/3","+2_2\/3","+3.0"]}

curl -X PUT -H "Content-Type: application/json" -d '{"value":"-3.0"}' http://192.168.7.122:8080/ccapi/ver100/shooting/settings/exposure  
{"value":"-3.0"}
