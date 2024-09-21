#include <bits/stdc++.h>
using namespace std;
int n, m;
int main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);

    cin >> n >> m;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            int x;
            cin >> x;
            cout << 1-x << " ";
        }
        cout << '\n';
    }

}
