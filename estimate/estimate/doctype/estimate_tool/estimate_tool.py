# -*- coding: utf-8 -*-
# Copyright (c) 2015, Test Products and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class EstimateTool(Document):
	def get_bom_item_button(self):
		dl = frappe.db.sql("""select b1.item_code, b1.item_name, b1.qty, b1.stock_uom, b1.rate, b1.amount
			from
				`tabBOM Item` b1
			where
				b1.parent = %s
			order by b1.idx ASC""", self.bom, as_dict=1)

		self.set('estimate_tool_item', [])

		for d in dl:
			nl = self.append('estimate_tool_item', {})
			nl.item_code = d.item_code
			nl.item_name = d.item_name
			nl.item_quantity = d.qty
			nl.item_uom = d.stock_uom
			nl.price_list_rate = d.rate
			nl.amounted_total = d.amount
			nl.invoiced_amount = d.amount
			nl.factor_1 = "1"
			nl.factor_2 = "1"
			nl.factor_3 = "1"
			nl.factor_4 = "1"
			nl.factor_5 = "1"

	pass
