// Copyright (c) 2016, Test Products and contributors
// For license information, please see license.txt


frappe.ui.form.on('Estimate Tool', {
	refresh: function(frm) {
		var me = this
		if(!frm.doc.__islocal) {
			cur_frm.add_custom_button(__('Make BOM'), cur_frm.cscript['generate_document'], "icon-exclamation", "btn-default");
		}
	},

	get_bom_item: function(frm) {
		frappe.call({
			doc: frm.doc,
			method: "get_bom_item_button",
			callback: function(r) {
				refresh_field("estimate_tool_item");
				refresh_field("total_amount_before_factor");
				refresh_field("grand_total_after_factor");
			}
		});
	},
});
cur_frm.set_query('item_code', function () {
    return {
        filters: {
            'item_group': 'Products'
        }
    }
});
//cur_frm.set_query('item_code', function () {
//    return {
//        filters: {
//            'item_group': 'Products'
//        }
//    }
//});
cur_frm.set_query("item_code", "estimate_tool_item",  function (doc, cdt, cdn) {
	var c_doc= locals[cdt][cdn];
    return {
        filters: {
            'item_group': 'Raw Material'
        }
    }
});

cur_frm.cscript.item_quantity = function(doc, cdt, cdn) {
	var d = locals[cdt][cdn];
        d.amounted_total = d.price_list_rate * d.item_quantity;
        d.invoiced_amount = d.price_list_rate * d.item_quantity;
	refresh_field('amounted_total', d.name, 'estimate_tool_item');
	refresh_field('invoiced_amount', d.name, 'estimate_tool_item');
}

cur_frm.cscript.price_list_rate = cur_frm.cscript.item_quantity;

cur_frm.cscript.factor_1 = function(doc, cdt, cdn) {
	var d = locals[cdt][cdn];
        d.invoiced_amount = d.amounted_total * d.factor_1 * d.factor_2 * d.factor_3 * d.factor_4 * d.factor_5;

	refresh_field('invoiced_amount', d.name, 'estimate_tool_item');
}

cur_frm.cscript.factor_2 = cur_frm.cscript.factor_1;
cur_frm.cscript.factor_3 = cur_frm.cscript.factor_1;
cur_frm.cscript.factor_4 = cur_frm.cscript.factor_1;
cur_frm.cscript.factor_5 = cur_frm.cscript.factor_1;
cur_frm.cscript.amounted_total = cur_frm.cscript.factor_1;

var calculate_total_quantity = function(frm) {
    var total_quantity = frappe.utils.sum(
        (frm.doc.estimate_tool_item || []).map(function(i) {
			return (i.item_quantity * i.price_list_rate * i.factor_1 * i.factor_2 * i.factor_3 * i.factor_4 * i.factor_5);
		})
    );
    frm.set_value("total_amount_before_factor", total_quantity);
    //frm.set_value("grand_total_after_factor", total_quantity);
}

frappe.ui.form.on("Estimate Tool Item", "item_quantity", function(frm, cdt, cdn) {
    calculate_total_quantity(frm, cdt, cdn);
})
frappe.ui.form.on("Estimate Tool Item", "price_list_rate", function(frm, cdt, cdn) {
    calculate_total_quantity(frm, cdt, cdn);
})
frappe.ui.form.on("Estimate Tool Item", "factor_1", function(frm, cdt, cdn) {
    calculate_total_quantity(frm, cdt, cdn);
})
frappe.ui.form.on("Estimate Tool Item", "factor_2", function(frm, cdt, cdn) {
    calculate_total_quantity(frm, cdt, cdn);
})
frappe.ui.form.on("Estimate Tool Item", "factor_3", function(frm, cdt, cdn) {
    calculate_total_quantity(frm, cdt, cdn);
})
frappe.ui.form.on("Estimate Tool Item", "factor_4", function(frm, cdt, cdn) {
    calculate_total_quantity(frm, cdt, cdn);
})
frappe.ui.form.on("Estimate Tool Item", "factor_5", function(frm, cdt, cdn) {
    calculate_total_quantity(frm, cdt, cdn);
})
frappe.ui.form.on("Estimate Tool", "refresh", function(frm) {
  calculate_total_quantity(frm);
});

//total faktor utk table primary
var calculate_excess_amounted_total = function(frm) {
	var excess_amounted_total = flt(frm.doc.price_factor_1) * flt(frm.doc.total_amount_before_factor);
	frm.set_value("grand_total_after_factor", excess_amounted_total);
}
frappe.ui.form.on("Estimate Tool", "total_amount_before_factor", function(frm) {
	calculate_excess_amounted_total(frm);
})
frappe.ui.form.on("Estimate Tool", "price_factor_1", function(frm) {
	calculate_excess_amounted_total(frm);
})

frappe.ui.form.on("Estimate Tool Item", "item_code", function(frm, cdt, cdn) {
	row = locals[cdt][cdn];
	frappe.call({
		method: "frappe.client.get",
		args: {
			doctype: "Item",
			name: row.item_code
		},
		callback: function (data) {
			frappe.model.set_value(cdt, cdn, "item_uom", data.message.stock_uom);
		}
	})
})
frappe.ui.form.on("Estimate Tool Item", "item_code", function(frm, cdt, cdn) {
	row = locals[cdt][cdn];
	frappe.call({
		method: "frappe.client.get",
		args: {
			doctype: "Item Price",
			filters: {
				"item_code": row.item_code,
				"price_list": "Standard Selling"
			}
		},
		callback: function (data) {
			frappe.model.set_value(cdt, cdn, "price_list_rate", data.message.price_list_rate);
		}
	})
});
