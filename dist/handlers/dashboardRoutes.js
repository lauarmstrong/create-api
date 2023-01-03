"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../services/dashboard");
const dashboardRoutes = (app) => {
    app.get("/products_in_orders", productsInOrders);
};
const dashboard = new dashboard_1.DashboardQueries();
const productsInOrders = async (_req, res) => {
    const products = await dashboard.productsInOrders();
    res.json(products);
};
exports.default = dashboardRoutes;
