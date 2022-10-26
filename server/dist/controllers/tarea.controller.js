"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putTarea = exports.postTarea = exports.deleteTarea = exports.getTarea = exports.getTareas = void 0;
var connection_1 = __importDefault(require("../db/connection"));
var getTareas = function (req, res) {
    connection_1.default.query('SELECT * FROM tareas WHERE estatus = ?', 1, function (err, data) {
        if (err)
            throw err;
        res.json(data);
    });
};
exports.getTareas = getTareas;
var getTarea = function (req, res) {
    var id = req.params.id;
    connection_1.default.query('SELECT * FROM tareas WHERE id_tarea = ?', id, function (err, data) {
        if (err)
            throw err;
        res.json(data[0]);
    });
};
exports.getTarea = getTarea;
var deleteTarea = function (req, res) {
    var id = req.params.id;
    var d = new Date(), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    var dateComplete = year + '/' + month + '/' + day;
    connection_1.default.query('UPDATE tareas SET fechaBaja = ?, estatus = ? WHERE id_tarea = ?', [dateComplete, 0, id], function (err, data) {
        if (err)
            throw err;
        res.json({
            msg: "Tarea eliminada"
        });
    });
};
exports.deleteTarea = deleteTarea;
var postTarea = function (req, res) {
    var body = req.body;
    connection_1.default.query('INSERT INTO tareas SET ?', [body], function (err, data) {
        if (err)
            throw err;
        res.json({
            msg: "Tarea agregada con exito"
        });
    });
};
exports.postTarea = postTarea;
var putTarea = function (req, res) {
    var body = req.body;
    var id = req.params.id;
    connection_1.default.query('UPDATE tareas SET  ? WHERE id_tarea = ?', [body, id], function (err, data) {
        if (err)
            throw err;
        res.json({
            msg: "Tarea actualizada con exito"
        });
    });
};
exports.putTarea = putTarea;
