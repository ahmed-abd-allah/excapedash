(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-159a2dbf"],{be6f:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("vx-card",t._g({staticClass:"list-view-item overflow-hidden"},t.$listeners),[s("template",{slot:"no-body"},[s("div",{staticClass:"vx-row item-details no-gutter"},[s("div",{staticClass:"vx-col sm:w-1/4 w-full item-img-container bg-white flex items-center justify-center cursor-pointer"},[t.item.image?s("img",{staticClass:"grid-view-img px-12",attrs:{src:t.item.image,alt:t.item.name}}):s("img",{staticClass:"grid-view-img px-4",attrs:{src:i("050a"),alt:t.item.name}})]),s("div",{staticClass:"vx-col sm:w-1/2"},[s("div",{staticClass:"p-4 pt-6"},[t._t("item-meta",[s("h6",{staticClass:"item-name font-semibold mb-1 hover:text-primary cursor-pointer"},[t._v(t._s(t.item.name))]),s("p",{staticClass:"text-sm mb-4"},[t._v("\n              By\n              "),s("span",{staticClass:"font-semibold cursor-pointer"},[t._v(t._s(t.item.brand))])]),s("p",{staticClass:"item-description text-sm"},[t._v(t._s(t.item.desc))])])],2)]),s("div",{staticClass:"vx-col sm:w-1/4 w-full flex items-center sm:border border-0 border-solid d-theme-border-grey-light border-r-0 border-t-0 border-b-0"},[s("div",{staticClass:"p-4 flex flex-col w-full"},[s("div",{staticClass:"my-6"},[s("h5",{staticClass:"font-bold text-center"},[t._v("$"+t._s(t.item.totalPrice*t.q))]),t.item.free_shipping?s("span",{staticClass:"text-grey flex items-start justify-center mt-1"},[s("feather-icon",{attrs:{icon:"ShoppingCartIcon",svgClasses:"w-4 h-4"}})],1):t._e()]),t._t("action-buttons")],2)])])])],2)},r=[],a=(i("c5f6"),{props:{item:{type:Object,required:!0},q:{type:Number,required:!0}},computed:{isInCart:function(){var t=this;return function(e){return t.$store.getters["eCommerce/isInCart"](e)}},isInWishList:function(){var t=this;return function(e){return t.$store.getters["eCommerce/isInWishList"](e)}}},methods:{toggleItemInWishList:function(t){this.$store.dispatch("eCommerce/toggleItemInWishList",t)},additemInCart:function(t){this.$store.dispatch("eCommerce/additemInCart",t)},cartButtonClicked:function(t){this.isInCart(t.id)?this.$router.push("/apps/eCommerce/checkout").catch((function(){})):this.additemInCart(t)},navigate_to_detail_view:function(){this.$router.push({name:"ecommerce-item-detail-view",params:{id:this.item.id}}).catch((function(){}))}}}),n=a,c=(i("daf1"),i("2877")),o=Object(c["a"])(n,s,r,!1,null,"5fdbb427",null);e["default"]=o.exports},daf1:function(t,e,i){"use strict";i("fed6")},fed6:function(t,e,i){}}]);
//# sourceMappingURL=chunk-159a2dbf.224dc50a.js.map