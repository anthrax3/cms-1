!function(a){/**
	 * Rich Text input class
	 */
Craft.RichTextInput=Garnish.Base.extend({id:null,entrySources:null,categorySources:null,assetSources:null,elementLocale:null,redactorConfig:null,$textarea:null,redactor:null,init:function(b,c,d,e,f,g,h,i){this.id=b,this.entrySources=c,this.categorySources=d,this.assetSources=e,this.elementLocale=f,this.redactorConfig=h,this.redactorConfig.lang||(this.redactorConfig.lang=i),this.redactorConfig.direction||(this.redactorConfig.direction=g),this.redactorConfig.imageUpload=!0;var j=this,k=h.initCallback;this.redactorConfig.initCallback=function(b,c){
// Did the config have its own callback?
// Did the config have its own callback?
return j.redactor=this,j.onRedactorInit(),a.isFunction(k)?k.call(this,b,c):c},
// Initialize Redactor
this.$textarea=a("#"+this.id),this.initRedactor(),"undefined"!=typeof Craft.livePreview&&(
// There's a UI glitch if Redactor is in Code view when Live Preview is shown/hidden
Craft.livePreview.on("beforeEnter beforeExit",a.proxy(function(){this.redactor.core.destroy()},this)),Craft.livePreview.on("enter slideOut",a.proxy(function(){this.initRedactor()},this)))},initRedactor:function(){this.$textarea.redactor(this.redactorConfig),this.redactor=this.$textarea.data("redactor")},onRedactorInit:function(){
// Only customize the toolbar if there is one,
// otherwise we get a JS error due to redactor.$toolbar being undefined
this.redactor.opts.toolbar&&this.customizeToolbar(),this.leaveFullscreetOnSaveShortcut()},customizeToolbar:function(){var b=this.replaceRedactorButton("image",Craft.t("Insert image")),c=this.replaceRedactorButton("link",Craft.t("Link"));if(b&&this.redactor.button.addCallback(b,a.proxy(function(){this.redactor.selection.save(),"undefined"==typeof this.assetSelectionModal?this.assetSelectionModal=Craft.createElementSelectorModal("Asset",{storageKey:"RichText.ChooseImage",multiSelect:!0,criteria:{locale:this.elementLocale,kind:"image"},onSelect:a.proxy(function(b,c){if(b.length){this.redactor.selection.restore();for(var d=0;d<b.length;d++){var e=b[d],f=e.url+"#asset:"+e.id;c&&(f+=":"+c),this.redactor.insert.node(a('<img src="'+f+'" />')[0]),this.redactor.code.sync()}this.redactor.observe.images(),this.redactor.dropdown.hideAll()}},this),closeOtherModals:!1,canSelectImageTransforms:!0}):this.assetSelectionModal.show()},this)),c){var d={};this.entrySources.length&&(d.link_entry={title:Craft.t("Link to an entry"),func:a.proxy(function(){this.redactor.selection.save(),"undefined"==typeof this.entrySelectionModal?this.entrySelectionModal=Craft.createElementSelectorModal("Entry",{storageKey:"RichText.LinkToEntry",sources:this.entrySources,criteria:{locale:this.elementLocale},onSelect:a.proxy(function(b){if(b.length){this.redactor.selection.restore();var c=b[0],d=c.url+"#entry:"+c.id,e=this.redactor.selection.getText(),f=e.length>0?e:c.label;this.redactor.insert.node(a('<a href="'+d+'">'+f+"</a>")[0]),this.redactor.code.sync()}this.redactor.dropdown.hideAll()},this),closeOtherModals:!1}):this.entrySelectionModal.show()},this)}),this.categorySources.length&&(d.link_category={title:Craft.t("Link to a category"),func:a.proxy(function(){this.redactor.selection.save(),"undefined"==typeof this.categorySelectionModal?this.categorySelectionModal=Craft.createElementSelectorModal("Category",{storageKey:"RichTextFieldType.LinkToCategory",sources:this.categorySources,criteria:{locale:this.elementLocale},onSelect:a.proxy(function(b){if(b.length){this.redactor.selection.restore();var c=b[0],d=c.url+"#category:"+c.id,e=this.redactor.selection.getText(),f=e.length>0?e:c.label;this.redactor.insert.node(a('<a href="'+d+'">'+f+"</a>")[0]),this.redactor.code.sync()}this.redactor.dropdown.hideAll()},this),closeOtherModals:!1}):this.categorySelectionModal.show()},this)}),this.assetSources.length&&(d.link_asset={title:Craft.t("Link to an asset"),func:a.proxy(function(){this.redactor.selection.save(),"undefined"==typeof this.assetLinkSelectionModal?this.assetLinkSelectionModal=Craft.createElementSelectorModal("Asset",{storageKey:"RichText.LinkToAsset",criteria:{locale:this.elementLocale},onSelect:a.proxy(function(b){if(b.length){this.redactor.selection.restore();var c=b[0],d=c.url+"#asset:"+c.id,e=this.redactor.selection.getText(),f=e.length>0?e:c.label;this.redactor.insert.node(a('<a href="'+d+'">'+f+"</a>")[0]),this.redactor.code.sync()}this.redactor.dropdown.hideAll()},this),closeOtherModals:!1,canSelectImageTransforms:!0}):this.assetLinkSelectionModal.show()},this)}),d.link={title:Craft.t("Insert link"),func:"link.show"},d.unlink={title:Craft.t("Unlink"),func:"link.unlink"},this.redactor.button.addDropdown(c,d)}},leaveFullscreetOnSaveShortcut:function(){"undefined"!=typeof this.redactor.fullscreen&&"function"==typeof this.redactor.fullscreen.disable&&Craft.cp.on("beforeSaveShortcut",a.proxy(function(){this.redactor.fullscreen.isOpen&&this.redactor.fullscreen.disable()},this))},replaceRedactorButton:function(a,b){
// Ignore if the button isn't in use
if(this.redactor.button.get(a).length){
// Create a placeholder button
var c=a+"_placeholder";this.redactor.button.addAfter(a,c),
// Remove the original
this.redactor.button.remove(a);
// Add the new one
var d=this.redactor.button.addAfter(c,a,b);
// Set the dropdown
//this.redactor.button.addDropdown($btn, dropdown);
// Remove the placeholder
return this.redactor.button.remove(c),d}}})}(jQuery);
//# sourceMappingURL=RichTextInput.js.map