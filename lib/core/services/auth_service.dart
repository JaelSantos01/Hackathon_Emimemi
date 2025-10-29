import 'package:cana_viva/core/services/api_services.dart';
import 'package:cana_viva/core/utils/constants.dart';
import 'package:cana_viva/models/User.dart';

class AuthService {
  final ApiServices _apiServices;
  User? _mockUser;

  AuthService(this._apiServices);

  Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await _apiServices.request(
      method: 'POST',
      endpoint: ApiConstants.loginPoint,
      data: {
        'email': email,
        'password': password,
      },
    );

    final responseData = response.data;

    if (responseData['message'] == 'Login exitoso') {
      final userJson = responseData['user'];
      _mockUser = User(
        username: userJson['username'],
        email: userJson['email'],
        password: password,
      );
      return {'user': _mockUser};
    } else {
      throw Exception('Credenciales inválidas');
    }
  }

  Future<bool> hasActiveSession() async {
    return _mockUser != null;
  }

  Future<User?> getCurrentUser() async {
    return _mockUser;
  }

  Future<void> logout() async {
    _mockUser = null;
  }
}