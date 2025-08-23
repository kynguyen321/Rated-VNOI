#include <bits/stdc++.h>
using namespace std;
long long n;
signed main()
{
    cin >> n;
    for (int i=1;i<=n;i++)
    {
        long long t,s=0;
        cin >> t;
        s+=(t*(t+1))/2;
        cout << s << endl;
    }
    return 0;
}