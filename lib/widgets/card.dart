import 'package:flutter/material.dart';

class CardCarousel extends StatelessWidget {
  final String imageUrl =
      'https://www.shutterstock.com/image-photo/sugar-cane-plantation-growing-up-600nw-2217936955.jpg'; // imagen única para todas las cards

  @override
  Widget build(BuildContext context) {
    return PageView.builder(
      itemCount: 3, // número de cards que quieres mostrar
      controller: PageController(viewportFraction: 0.9),
      itemBuilder: (context, index) {
        return Padding(
          padding: const EdgeInsets.symmetric(horizontal: 6),
          child: Card(
            elevation: 6,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
            clipBehavior: Clip.antiAlias,
            child: Stack(
              fit: StackFit.expand,
              children: [
                Image.network(
                  imageUrl, // misma imagen para todas las cards
                  fit: BoxFit.cover,
                ),
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
                    'Hectaria ${index + 1}', // puedes personalizar el texto por card
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
        );
      },
    );
  }
}
