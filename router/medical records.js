const express = require('express');
const router = express.Router();

//import database
const connection = require('../config/database');

//import express validator
const { body, validationResult } = require('express-validator');

/**
 * INDEX POST
 */
router.get('/', function (req, res){
    //query
    connection.query('SELECT * FROM rekam_medis ORDER BY id DESC', function (err, rows){
        if (err) {
            return res.status(500).json({
                status: 'false',
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: 'true',
                message: 'OK',
                data: rows
            })
        }
    });
});

/**
 * STORE POST
 */
router.post('/store', [
    //validation
    body('tgl_kunjungan').notEmpty(),
    body('nama_user').notEmpty(),
    body('gejala').notEmpty(),
    body('diagnosa').notEmpty(),
    body('obat').notEmpty(),
    body('description').notEmpty(),
], (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //define formData
    let formData ={
        tgl_kunjungan: req.body.tgl_kunjungan,
        nama_user: req.body.nama_user,
        gejala: req.body.gejala,
        diagnosa: req.body.diagnosa,
        obat: req.body.obat,
        description: req.body.description,
    }

    const date = new Date(req.body.tgl_kunjungan)

    // insert query
    connection.query('INSERT INTO rekam_medis SET ?', formData, function(err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: 'false',
                message: 'Internal Server Error'
            })
        } else {
            return res.status(200).json({
                status: 'true',
                message: 'Success',
                data: rows[0]
            })
        }
    })
});

/**
 * SHOW POST
 */
router.get('/(:id)', function(req, res){
    let id = req.params.id;

    connection.query(`SELECT * FROM rekam_medis WHERE id = ${id}`, function(err, rows){
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error'
            })
        }
        // if post not found
        if (rows.length <= 0 ){
            return res.status(404).json({
                status: false,
                message: 'Data Post Not Found!'
            })
        } else { //if post found
            return res.status(200).json({
                status: true,
                message: 'Detail Data Post',
                data: rows[0]
            })
        }
    })
})

/**
 * UPDATE POST
 */
router.patch('/update/:id', [
    //validation
    body('tgl_kunjungan').notEmpty(),
    body('nama_user').notEmpty(),
    body('gejala').notEmpty(),
    body('diagnosa').notEmpty(),
    body('obat').notEmpty(),
    body('description').notEmpty(),

], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //id post
    let id = req.params.id;

    //data post
    let formData = {
        tgl_kunjungan: req.body.tgl_kunjungan,
        nama_user: req.body.nama_user,
        gejala: req.body.gejala,
        diagnosa: req.body.diagnosa,
        obat: req.body.obat,
        description: req.body.description,
    }

    const date = new Date(req.body.tgl_kunjungan)

    //update query
    connection.query(`UPDATE rekam_medis SET ? WHERE id = ${id}`, formData, function (err, rows) {
        //if (err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Interval Server Error'
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Update Data Successfully!'
            })
        }
    })
});

/**
 * DELETE POST
 */
router.delete('/delete/(:id)', function (req, res) {
    let id = req.params.id;

    connection.query(`DELETE FROM rekam_medis WHERE id = ${id}`, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Interval Server Error'
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Delete Data Successfully!'
            })
        }
    })
})

module.exports = router;