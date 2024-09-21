#include <iostream>
#include <stdio.h>
#include <vector>
#include <cmath>
#include <math.h>
#include <map>
#include <algorithm>
#include <set>
#include <bitset>
#include <queue>
#include <cstring>
#include <stack>
#include <iomanip>
#include <assert.h>

#define _(x) (1LL<<(x))
#define BIT(x,pos) (((x)>>(pos)) & 1LL)
#define turn_all(x) (_(x)-1LL)
#define bitCnt(x) __builtin_popcountll(x)

#define name "test"
#define nameTask ""
#define fastIO ios::sync_with_stdio(false); cin.tie(0);

using namespace std;
typedef long long ll;
typedef long double ld;
typedef unsigned long long ull;
typedef pair<int,int> pii;
typedef pair<int,ll> pil;
typedef pair<ll, int> pli;
typedef pair<ll, ll> pll;
typedef vector<int> vi;
typedef vector<ll> vll;

const int N = 100;
const int M = 1E7;

int prodPow[M+9], lcmPow[M+9];
int a[N+9];
int n;

void factNum(int n,int val, int myPow[N+9])
{
    for (int i = 2;i <= n; ++i)
            for (;n % i == 0;)
            {
                n /= i;
                myPow[i] += val;
            }
}

ll myPow(ll x,ll y)
{
    ll res = 1;
    while (y > 0)
    {
        if (y & 1) (res = res * x);
        y >>= 1;
        (x = x * x);
    }
return res;
}

void factLCM(int n)
{
    for (int i = 2;i <= n; ++i)
    {
        int cnt = 0;
        for (;n % i == 0;)
        {
            n /= i;
            ++cnt;
        }
        lcmPow[i] = max(lcmPow[i],cnt);
    }
}

void solveOne()
{
    for (int i = 1;i <= n; ++i) factNum(a[i],1, prodPow);

    for (int i = 1;i <= n; ++i) factLCM(a[i]);

    for (int i = 1;i <= M; ++i)
        prodPow[i] -= lcmPow[i];

    ll ans = 1;
    for (int i = 1;i <= M; ++i) (ans *= myPow(i,prodPow[i]));
    cout<<ans<<"\n";
}

int myGCD(int a,int b)
{
    while (b > 0)
    {
        int r = a % b;
        a = b;
        b = r;
    }
return a;
}

void solveTwo()
{
    int G = 1;
    for (int i = 1;i <= n; ++i) G *= a[i];

    int F = a[1];
    for (int i = 2;i <= n; ++i) F = ((F * a[i]) / (myGCD(F,a[i])));

    cout<<G/F;
}

signed main()
{
    fastIO

    cin>>n;

    if (n == 0) return cout<<"impossible", 0;

    for (int i = 1;i <= n; ++i)
    {
        cin>>a[i];
        if (a[i] == 0) return cout<<"impossible" ,0;
    }

    solveOne();
}
