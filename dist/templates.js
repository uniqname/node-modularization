this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["Templates"] = this["Handlebars"]["Templates"] || {};

this["Handlebars"]["Templates"]["index.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			";
  stack1 = self.invokePartial(partials.section, 'section', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		";
  return buffer;
  }

  buffer += "\n<div class=\"reveal index\">\n	<div class=\"slides\">\n		";
  stack1 = self.invokePartial(partials.start, 'start', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.sections), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		";
  stack1 = self.invokePartial(partials.end, 'end', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n</div>\n";
  return buffer;
  });