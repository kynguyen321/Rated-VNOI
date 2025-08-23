#include <bits/stdc++.h>
#define ll long long
using namespace std;
ll n;
bool doixung(ll u)
{
    ll s=0,t=u;
    while (u!=0)
    {
        s=s*10+u%10;
        u/=10;
    }
    return (s==t);
}
bool cp(ll u)
{
    return (sqrt(u)==trunc(sqrt(u)));
}
bool kiemtra(ll u)
{
    return (cp(u)&&doixung(u));
}
int main()
{
    cin >> n;
    ll p=n-1;
    while (!kiemtra(p))
    p--;
    cout << p;
    return 0;
}