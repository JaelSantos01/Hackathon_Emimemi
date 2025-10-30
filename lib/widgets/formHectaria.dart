import 'package:cana_viva/core/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:dio/dio.dart';

class CampoHectareaForm extends StatefulWidget {
  @override
  _CampoHectareaFormState createState() => _CampoHectareaFormState();
}

class _CampoHectareaFormState extends State<CampoHectareaForm> {
  final Dio dio = Dio();
  final _formKey = GlobalKey<FormState>();

  final TextEditingController _campoNombreController = TextEditingController();
  final TextEditingController _campoUbicacionController = TextEditingController();
  final TextEditingController _hectareaIdentificadorController = TextEditingController();

  bool _isSubmitting = false;

  Future<void> submitForm() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isSubmitting = true);

    try {
      // 1️⃣ Crear Campo
      final campoResponse = await dio.post(
        ApiConstants.camposPoint,
        data: {
          'nombre': _campoNombreController.text,
          'ubicacionMunicipio': _campoUbicacionController.text,
        },
      );

      final campoId = campoResponse.data['id'];
      print('Campo creado con ID: $campoId');

      final hectareaResponse = await dio.post(
        ApiConstants.hectariaPoint,
        data: {
          'identificador': _hectareaIdentificadorController.text,
          'CampoId': campoId,
        },
      );

      print('Hectarea creada: ${hectareaResponse.data}');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Campo y Hectarea creados exitosamente')),
      );
    } catch (e) {
      print('Error: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error al crear los datos')),
      );
    } finally {
      setState(() => _isSubmitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Crear Campo y Hectarea')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              const Text('Datos del Campo', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              TextFormField(
                controller: _campoNombreController,
                decoration: InputDecoration(labelText: 'Nombre del Campo'),
                validator: (value) => value == null || value.isEmpty ? 'Campo requerido' : null,
              ),
              TextFormField(
                controller: _campoUbicacionController,
                decoration: InputDecoration(labelText: 'Ubicación Municipio'),
                validator: (value) => value == null || value.isEmpty ? 'Ubicación requerida' : null,
              ),
              const SizedBox(height: 24),
              const Text('Datos de la Hectarea', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              TextFormField(
                controller: _hectareaIdentificadorController,
                decoration: InputDecoration(labelText: 'Identificador de Hectarea'),
                validator: (value) => value == null || value.isEmpty ? 'Identificador requerido' : null,
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: _isSubmitting ? null : submitForm,
                child: Text(_isSubmitting ? 'Enviando...' : 'Crear'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}