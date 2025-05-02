function SetEtaTem(config) {
  var res = [];
  var color = config.component.SetEtaTem.color;
  var background_ManageContent = document.getElementById("manage-content").style
    .backgroundColor;

    //class="collaboration-pined-container"
    //toa-view-control-layout-table toa-layout-reset  
  if (background_ManageContent != "#" + color) {
    document.getElementById("manage-content").style.backgroundColor =
      "#" + color;
    if (
      document.getElementsByClassName(
        " toa-view-control-resourcetreecaption toa-panel-title"
      ).length >= 3
    ) {
      document.getElementsByClassName(
        " toa-view-control-resourcetreecaption toa-panel-title"
      )[1].style.backgroundColor = "#" + color;
    }
    res.push({ set: "manage-content", msg: "set manage-content color  " });
  }
  if (document.getElementsByClassName("toaGantt").length > 0) {
    document.getElementsByClassName("toaGantt")[0].style.backgroundColor =
      "#" + color; //fix por si entra en otro ajuste donde no este el esa area
    res.push({ set: "toaGantt", msg: "set toaGantt color  " });
  }
  return { SetEtaTem: res };
}
