import 'package:cana_viva/core/utils/constants.dart';
import 'package:cana_viva/models/Hectaria.dart';
import 'package:cana_viva/widgets/formHectaria.dart';
import 'package:cana_viva/widgets/hectariasdetail.dart';
import 'package:flutter/material.dart';
import 'package:dio/dio.dart';

class CardCarousel extends StatefulWidget {
  @override
  _CardCarouselState createState() => _CardCarouselState();
}

class _CardCarouselState extends State<CardCarousel> {
  final Dio dio = Dio();
  late Future<List<Hectarea>> _futureHectareas;

  @override
  void initState() {
    super.initState();
    _futureHectareas = fetchHectareas();
  }

  Future<List<Hectarea>> fetchHectareas() async {
    try {
      final response = await dio.get(ApiConstants.hectariaPoint);
      print('Status: ${response.statusCode}');
      print('Data: ${response.data}');

      final List data = response.data is List
          ? response.data
          : response.data['hectareas'] ?? [];

      return data.map((json) => Hectarea.fromJson(json)).toList();
    } catch (e) {
      print('Error al obtener hectáreas: $e');
      return [];
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Hectarea>>(
      future: _futureHectareas,
      builder: (context, snapshot) {
        if (!snapshot.hasData) {
          return const Center(child: CircularProgressIndicator());
        }

        final hectareas = snapshot.data!;
        final totalCards = hectareas.length + 1;

        return PageView.builder(
          itemCount: totalCards,
          controller: PageController(viewportFraction: 0.9),
          itemBuilder: (context, index) {
            if (index == hectareas.length) {
              return buildAddCard();
            }
            return buildHectareaCard(hectareas[index]);
          },
        );
      },
    );
  }

  Widget buildHectareaCard(Hectarea hectarea) {
  return Padding(
    padding: const EdgeInsets.symmetric(horizontal: 6),
    child: GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => HectareaDetailScreen(hectarea: hectarea),
          ),
        );
      },
      child: Card(
        elevation: 6,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        clipBehavior: Clip.antiAlias,
        child: Stack(
          fit: StackFit.expand,
          children: [
            Image.network(hectarea.imageUrl, fit: BoxFit.cover),
            Container(
              alignment: Alignment.bottomLeft,
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [Colors.transparent, Colors.black54],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                ),
              ),
              child: Text(
                hectarea.identificador,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 1.1,
                ),
              ),
            ),
          ],
        ),
      ),
    ),
  );
}

  Widget buildAddCard() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 6),
      child: GestureDetector(
        onTap: () async {
          await Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => CampoHectareaForm()),
          );
          // Recargar hectareas después de volver del formulario
          setState(() {
            _futureHectareas = fetchHectareas();
          });
        },
        child: Card(
          elevation: 6,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          clipBehavior: Clip.antiAlias,
          child: Stack(
            fit: StackFit.expand,
            children: [
              Container(color: Colors.grey[300]),
              const Center(
                child: Icon(
                  Icons.add_circle_outline,
                  size: 60,
                  color: Colors.green,
                ),
              ),
              const Positioned(
                bottom: 12,
                left: 12,
                child: Text(
                  'Agregar Hectarea',
                  style: TextStyle(
                    color: Colors.black87,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
