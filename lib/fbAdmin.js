import * as admin from 'firebase-admin';

if (!admin.apps.length) {

  admin.initializeApp({
    credential: admin.credential.cert({
      "type": "service_account",
      "project_id": "tessa-e95ff",
      "private_key_id": "bfaba5d3b380b041445545373ee5a73e281f46a4",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDDA8AA1jjVpSP0\nnXDhJ99Cx5n06dlXw/SCVqNRCBjx5norqIT2K4/hNeNN5/oj6Jut5j3v/e8IF/1p\nC/HF0MEvmPQBjq7fmVjXWMu3cZiTWORa8dCsxPLaRMb+en/jSYjmcTMIHbGnXJuH\n3zPlPcMz91WlzsIivdhn0ppMa2Zcp/7OGpcKF0zWkZPs6jfQ5zRt7eHZTbGHgSSn\nnTCSTm8lzSUrHnTt7myWCdLfr/gA5uFpswp2m9FGFI0R+IeZ2RD1zQy2SOACdiiG\nx48eM783A/AZpWOHq3SbemC7Sn2SPZoyql6iPSFuAC6gHdOjspBeckY3r3m+SeJF\nJWoY1UoPAgMBAAECggEALXY8VnWaPkQHQ8lIPVT8OScq/utdHZay84ea/xLyLcJb\nDL52cKTrH8dePBUuPRzG3h1kpwP9q1dcXhbIwCLQRnZTu+E1Zy7qhRlQNG2o8gCx\nC3p/+SbYroWGFmEcWzITVhVhniy985QlNeGUyYZCcWThdIvkuhCj2GBCVDpdXI/t\nFDXSUD1TqXJtzp0PT3gbkyfZHC+W96ctFXH/jeUxGPImOCt9YJ00viQq4B97tuZd\nNw2F25Uw70K5038vYWHQMiFc2ufLee/icfBcWtjoh5/oTkvE207Nj2f5ZNOBZ8AG\nNC8RVHcXdvgkYQ9FsZq+zeJrmBCd0Cclxi0cKALPYQKBgQDo+3opPDdeDchueE0G\n0f9ynAW4IXQfzXcJI7AOktR2fZx04ycH4k/ZnOPuhQKmhmZWu6OaMHKW+d0lR8Na\na1J2LaU8i38oORjaD+lG90Og9mnl1mCsodEqlFBc8XggUUDqtqEk92Zuqo1lkQug\nO5xaBS9IS4kajGKwsYrXctJbRwKBgQDWSAFFQNx7jmfoApdC0Lw1DCCX1ryHQATe\nAo0JVbDhmSfjjKvlnuVc3KW5YvtnjoHygrd0JJkEET2WRIKs9FQb1qPkeJetgLh8\npavf4BJpYLuNscHL28VuFWok0Wn4QqwW3cUaX+6G0/Fn0dmemPlIzammC5SyObIC\nzgjJ/e5u+QKBgQCwSomXZh8nJhrBrHnsbT5zxKd3OqkZ32jxG3X+sQ/fURDwSWmh\nR5fQPC0ksLTeuNf7TSRwabRrlUnHCdRCOO8+yS887vkawImTh3Km5jbgN1TOOzcP\nqaoSJAPjMDwLiDAs6mBpDmMN3jP75JL9fd3DKCUs+SsXUZ7jwJQkjpepxQKBgQCF\ny9YHQPWqrIOSqbN7A8zQrq7XQDzdkoq3eQ5JStk0NCZk/dwDd1CtyBQuinCB+8iF\n/TrBaWylzoIPBt41UiYGb+JL8UR8EIihQ+zq0AWPCNhzJA/m02YWU4bAUIYDftXn\nPTgqPMY6J7JvaeehENFutQP96vNAyaet+qogPc8YOQKBgGdJIBaddwZ8BFMnxboT\nYgNLNoZLJqc/WHR4DO+OZ0/7D76AWjORKG44O82UZ30+ZpdQ/FivuBEj7fApcCGq\n7uYLVcN56lpP6ENpIaVAUk2aLPt02m5WBnrfvCxWSFlfyvYiumC5QwmIQaEAKRZK\nDesC+mJQgzpwCy7aup4ZPeGZ\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-i3kvg@tessa-e95ff.iam.gserviceaccount.com",
      "client_id": "111756742342307384766",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-i3kvg%40tessa-e95ff.iam.gserviceaccount.com"
    }),
    apiKey: "AIzaSyCPUFkzdNSJtekNuLS-rTO3PS9eKooAuyQ",
    authDomain: "tessa-e95ff.firebaseapp.com",
    databaseURL: "https://tessa-e95ff.firebaseio.com",
    projectId: "tessa-e95ff",
    storageBucket: "tessa-e95ff.appspot.com",
    messagingSenderId: "387014740994",
    appId: "1:387014740994:web:dd9ff74f403d18a018ab1b",
    measurementId: "G-55H8ZK41DW"
  });
}

export default admin;