import { Request, Response } from 'express';
import connection from '../db/connection';

export const getTareas = (req: Request, res: Response) => {

    connection.query('SELECT * FROM tareas WHERE estatus = ?', 1,(err, data) => {
        if(err) throw err;
        res.json(data)
    });

}

export const getTarea = (req: Request, res: Response) => {

    const { id } = req.params;

    connection.query('SELECT * FROM tareas WHERE id_tarea = ?',id,  (err, data) => {
        if(err) throw err;
        res.json(data[0])
    });

}

export const deleteTarea = (req: Request, res: Response) => {

    const { id } = req.params;
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
        if (month.length < 2) 
        month = '0' + month;
         if (day.length < 2) 
        day = '0' + day;

        const dateComplete = year+'/'+month+'/'+day;
    
    connection.query('UPDATE tareas SET fechaBaja = ?, estatus = ? WHERE id_tarea = ?' ,[dateComplete, 0, id],  (err, data) => {
        if(err) throw err;
        res.json({
            msg: "Tarea eliminada"
        })
    });

}

export const postTarea = (req: Request, res: Response) => {
    const { body } = req;

    connection.query('INSERT INTO tareas SET ?' ,[body],  (err, data) => {
        if(err) throw err;
        res.json({
            msg: "Tarea agregada con exito"
        })
    });
}

export const putTarea = (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    connection.query('UPDATE tareas SET  ? WHERE id_tarea = ?' ,[body, id],  (err, data) => {
        if(err) throw err;
        res.json({
            msg: "Tarea actualizada con exito"
        })
    });
}