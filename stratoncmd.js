module.exports = function (RED) {
    
    function getfullVarName(vt,v) {
        if (vt === 'app' || vt === 'sys' || vt === 'oem') {
            return vt + "." + v;
        }

        return v;
    }
    
    function StratonCmdNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;


        // Store local copies of the node configuration (as defined in the .html)
        node.command = config.command;
        node.variable = getfullVarName(config.variableType,config.variable);
        //node.variableType = getfullVarName(config.variableType);
        //node.trace("var=" + config.variable + config.variableType);        
        //node.trace("StratonCmdNode = " + config.command);


        var flowContext = node.context().flow;
        var nodeContext = this.context();
        var globalContext = this.context().global;

        function stratonGetStatusWS() {
            var strCmd = "{\"cmd\":\"status2\"}";
            msg = {
                payload: JSON.parse(strCmd)
            }
            node.send(msg);
        }

        function stratonGetVarListWS() {
            var strCmd = "{\"cmd\":\"list2\"}";

            msg = {
                payload: JSON.parse(strCmd)
            }
            node.send(msg);
        }


        function stratonReadValueWS(varName) {
            var strCmd = "{\"cmd\":\"read2\",\"data\":[" + "{\"name\":\"" + varName + "\"}" + "]}";

            msg = {
                payload: JSON.parse(strCmd)
            }
            node.send(msg);
        }

        function stratonWriteValueWS(varName, varValue) {
            var strCmd = '{\"cmd\":\"write2\",\"data\":[';
            strCmd += '{\"name\":\"';
            strCmd += varName;
            strCmd += '\"';
            strCmd += ',';
            strCmd += '\"value\":\"';
            strCmd += varValue;
            strCmd += '\"}';
            strCmd += ']}';
            
            msg = {
                payload: JSON.parse(strCmd)
            }
            node.send(msg);
        }




        // We received something from the Node input
        node.on('input', function (msg) {
            var strValue = "";

            var value = RED.util.getMessageProperty(msg,"payload");
            if (value !== undefined) {
                if (typeof value === "string") {    //payload is a string
                    strValue = value;
                }
                else if (typeof value === "number") {      //payload is an integer
                    strValue = value.toString();   // we make it a string
                }
            }
            
            //node.trace("var=" + this.variable);


            if(this.command==="status2") {
                stratonGetStatusWS();
            } else if (this.command === "list2") {
                stratonGetVarListWS();
            } else if (this.command === "write2") {
                if (this.variable !== undefined && this.variable !== '') {
                    stratonWriteValueWS(this.variable, strValue);
                }
                else {
                    node.status({
                        fill: "red",
                        shape: "ring",
                        text: "Variable not specified"
                    });
                }
            } else if (this.command === "read2") {
                if (this.variable !== undefined && this.variable !== '') {
                    stratonReadValueWS(this.variable);
                }
                else {
                    node.status({
                        fill: "red",
                        shape: "ring",
                        text: "Variable not specified"
                    });
                }
            } else {
                node.status({
                    fill: "red",
                    shape: "ring",
                    text: "Unknown command"
                });
            }
           
        });
    }
    RED.nodes.registerType("straton command", StratonCmdNode);
}
