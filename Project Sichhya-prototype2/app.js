 new Vue({
  el:'#control',
  data: {
    
    toggleCollapse: false,
    
  }
});
// Side Menu function
function sideMenuToggle(){
  const sideMenu = document.getElementById("side-menu");
  if(sideMenu.style.left!=="0px"){
    sideMenu.style.left="0";
  }else{
    sideMenu.style.left="-20rem";
  }
  
    // sideMenu.classList.remove('move-right');
  
 
  
}