#include <bits/stdc++.h>

using namespace std;

#define int long long

int n;
int k;
int a[200001], psum[200001];

int BIT[200001];

void update(int x) {
    for (; x <= n; x += x & (-x))
        BIT[x]++;
}

int query(int x) {
    int ans = 0;
    for (; x > 0; x -= x & (-x))
        ans += BIT[x];
    return ans; 
}


bool check(int x) {
    for (int i = 1; i <= n; i++) BIT[i] = 0;
    int cnt = 0, cur = 0;
    for (int i = 1; i <= n; i++) {
        update(lower_bound(psum + 1, psum + 1 + n, cur) - psum);
        cur += a[i];
        cnt += query(upper_bound(psum + 1, psum + 1 + n, cur - x) - psum - 1);
    }   
    return (cnt >= k);
}

int32_t main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);

    cin >> n >> k;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        psum[i] = a[i - 1] + psum[i - 1];
    }
    sort(psum + 1, psum + 1 + n);

    int l = -1e14, r = 1e14, ans = 0;

    while (l <= r) {
        int mi = (l + r) / 2;
        if (check(mi)) {
            ans = mi;
            l = mi + 1;
        }
        else
            r = mi - 1;
    }
    cout << ans;    
}
