class Hectarea {
  final int id;
  final String identificador;
  final String imageUrl;

  Hectarea({
    required this.id,
    required this.identificador,
    required this.imageUrl,
  });

  factory Hectarea.fromJson(Map<String, dynamic> json) {
    return Hectarea(
      id: json['id'],
      identificador: json['identificador'],
      imageUrl: 'https://www.shutterstock.com/image-photo/sugar-cane-plantation-growing-up-600nw-2217936955.jpg',
    );
  }
}