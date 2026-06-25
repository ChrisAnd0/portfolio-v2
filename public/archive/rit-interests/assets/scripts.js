//Nav JS for nav dropdowns
function displayMenu(menuItem) {
	if (menuItem.nodeName === "DIV") {
		var menuList=menuItem.children[1];
		menuList.style.display = "block";
	} else {
		var menuList=menuItem.parentNode.children[1];
		menuList.style.display = "block";
	}
}

function hideMenu(menuItem) {
	var menuList=menuItem.children[1];
	menuList.style.display = "none";
}