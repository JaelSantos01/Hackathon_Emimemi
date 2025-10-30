import 'package:cana_viva/core/utils/constants.dart';
import 'package:dio/dio.dart';

class ApiServices {
  late Dio _dio;

  ApiServices() {
    _configDio();
  }

  void _configDio() {
    _dio = Dio(
      BaseOptions(
        baseUrl: ApiConstants.url,
        connectTimeout: ApiConstants.timeout,
        receiveTimeout: ApiConstants.timeout,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      ),
    );

    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) {
          // No token necesario
          return handler.next(options);
        },
        onResponse: (response, handler) {
          return handler.next(response);
        },
        onError: (error, handler) {
          print('Error en la petición: ${error.message}');
          return handler.next(error);
        },
      ),
    );
  }

  Future<Response> request({
    required String method,
    required String endpoint,
    Map<String, dynamic>? data,
    Map<String, dynamic>? queryParameters,
  }) async {
    try {
      final response = await _dio.request(
        endpoint,
        data: data,
        queryParameters: queryParameters,
        options: Options(method: method),
      );
      return response;
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  Exception _handleError(DioException error) {
    if (error.response != null) {
      final responseData = error.response!.data;
      if (responseData is Map && responseData.containsKey('message')) {
        return Exception(responseData['message']);
      }
      return Exception('Error del servidor: ${error.response!.statusCode}');
    } else {
      return Exception('Error de conexión: ${error.message}');
    }
  }
}