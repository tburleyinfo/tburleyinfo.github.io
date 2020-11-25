safari.self.addEventListener("message", function(event) {
    if (event.name == "BFRSafariAppExtensionIconPresent" && window === window.top) {
        presentExtension({text:event.message.title, url:event.message.url});
    } else {
        console.log("BFFR Received a message named: "+ event.name);
    }
 });
 
 function presentExtension(params){
     safari.extension.dispatchMessage("presentExtension", params);
 }
 
 var iframe;
 var container;
 
 function initContainerFrame(params) {
     var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
     
     var iframeURI = ''+ safari.extension.baseURI + 'buffer-frame-container.html?'+queryString+'';
     
     iframe = '<iframe scrolling="no" id="buffer_overlay" name="buffer_overlay" src="'+iframeURI+'" style="border: none !important; height: 100% !important; width: 100% !important; position: fixed !important; z-index: 999999999999 !important; top: 0px !important; left: 0px !important; display: block !important; max-width: 100% !important; max-height: 100% !important; padding: 0px !important; background-color: rgba(245, 245, 245, 0.741176) !important; background-size: 40px !important; background-image: none !important; background-position: center center !important; background-repeat: no-repeat no-repeat !important;"></iframe>';
     container = document.createElement('div');
     container.innerHTML = iframe;
     document.body.appendChild(container);
 }
 
 function extractOrigin(str) {
     var matched = str.match(/([a-z-]+:\/\/[^\/]+)/);
     return matched[1];
 }
 
 // Listen to messages from nested frame and pass them up the window stack
 function setupMessageRelay() {
     var handler = function(e) {
         var origin = e.origin || e.originalEvent.origin;
 
         var extensionOrigin = extractOrigin(safari.extension.baseURI).toLowerCase();
         
         if (origin != extensionOrigin) {
             return;
         }
         
         var data;
         if(typeof e.data === "object"){
             data = e.data;
         } else {
             data = JSON.parse(e.data);
         }
     
         if(data["data"] && data["data"]["sent"]){
             window.removeEventListener('message', handler);
             document.body.removeChild(container);
         }
                         
         safari.extension.dispatchMessage("message", data);
     }
     window.addEventListener('message', handler);
 }