class ApiConstants {
  static const String url = "http://localhost:8000/api";
  static const String loginPoint = "http://localhost:8000/api/auth/login";
  static const String registerPoint = "http://localhost:8000/api/auth/register";
  static const Duration timeout = Duration(seconds: 10);
}

class StorageKeys {
  static const String token = "auth_token";
  static const String userData = "user_data";
}
