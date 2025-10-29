import 'package:cana_viva/core/services/api_services.dart';
import 'package:cana_viva/models/User.dart';

class AuthService {
  User? _mockUser;

  AuthService(ApiServices apiService);

  Future<Map<String, dynamic>> login(String email, String password) async {
    await Future.delayed(const Duration(seconds: 1));
    if (email == 'panwhitmiel@gmail.com' && password == 'panadero11') {
      _mockUser = User(username: 'AlexCop', email: email, password: password);
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
