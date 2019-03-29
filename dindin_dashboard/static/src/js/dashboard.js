odoo.define('dindin.blackboard.info', function (require) {
    "use strict";

    let Dialog = require('web.Dialog');
    let core = require('web.core');
    let QWeb = core.qweb;
    let rpc = require('web.rpc');
    let AbstractAction = require('web.AbstractAction');


    let DinDinDashboard = AbstractAction.extend({
        template: 'DindinDashboardInfo',
        setBlackboardData: function (data) {
            let self = this;
            self.$el.find('#blackboard_list').html(QWeb.render("DindinDashboardInfoLine", {
                widget: self,
                data: data,
            }));
        },
        setBlackboardFalseData: function (data) {
            let self = this;
            self.$el.find('#blackboard_list').html(QWeb.render("DindinDashboardInfoLineFalse", {
                widget: self,
                data: data,
            }));
        },
        setBlackboardDataNull: function () {
            let self = this;
            self.$el.find('#blackboard_list').html(QWeb.render("DindinDashboardInfoLineNull", {
                widget: self,
                data: [],
            }));
        },

        start: function () {
            let self = this;
            let def = rpc.query({
                model: 'dindin.blackboard',
                method: 'get_blackboard_by_user',
                args: [],
            }).then(function (result) {
                if (result.state) {
                    if (result.data.length == 0) {
                        self.setBlackboardDataNull();
                    } else {
                        self.setBlackboardData(result.data);
                    }
                } else {
                    self.setBlackboardFalseData(result);
                }
            });
        },
    });

    core.action_registry.add('dindin_dashboard', DinDinDashboard);
    return DinDinDashboard;
});