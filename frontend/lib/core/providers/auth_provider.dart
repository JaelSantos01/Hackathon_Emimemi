import 'package:flutter/material.dart';
import 'package:cana_viva/core/services/auth_service.dart';
import 'package:cana_viva/models/User.dart';

class AuthProvider with ChangeNotifier {
  final AuthService _authService;

  User? _user;
  bool _isLoading = false;
  String? _errorMessage;

  AuthProvider(this._authService);

  User? get user => _user;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  bool get isAuthenticated => _user != null;

  Future<bool> login(String email, String password) async {
    try {
      final result = await _authService.login(email, password);
      _user = result['user'];
      _errorMessage = null;
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    }
  }

  Future<bool> checkSession() async {
    final hasSession = await _authService.hasActiveSession();
    if (hasSession) {
      _user = await _authService.getCurrentUser();
      notifyListeners();
      return true;
    }
    return false;
  }

  Future<void> logout() async {
    await _authService.logout();
    _user = null;
    notifyListeners();
  }
}
