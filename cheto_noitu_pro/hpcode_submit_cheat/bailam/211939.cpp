#include <bits/stdc++.h>
using namespace std;
long long n;
signed main()
{
    cin >> n;
    long long s=0;
    for (int i=1;i<=n;i++)
    {
        s+=pow(-1,i)*i;
    }
    cout << s;
    return 0;
}