// ----------------------------------------------------------
// Họ và tên : < Ghi vào đây >
// Problem : ...
// ----------------------------------------------------------
#include<bits/stdc++.h>
// #pragma GCC optimize("O3")  
// #pragma GCC optimize("unroll-loops")  
// #pragma GCC target("avx2,bmi,bmi2,popcnt,lzcnt")  
using namespace std;
#define dbg(...) debug_out(#__VA_ARGS__, __VA_ARGS__)
 
void debug_out(const char* s) {cerr << s << '\n';}
 
template<typename T, typename... Ts>
void debug_out(const char* names, T&& first, Ts&&... rest) {
    const char* comma = strchr(names, ',');
    if (comma) {
        string name(names, comma - names);
        cerr << name << " = " << first << " | ";
        const char* next = comma + 1;
        if (*next == ' ') ++next;
        debug_out(next, forward<Ts>(rest)...);
    } else cerr << names << " = " << first << '\n';
}
 
#define ll              long long int
#define ull             unsigned long long
#define ld              long double
#define pii             pair<int, int>
#define pll             pair<ll, ll>
#define vi              vector<int>
#define vll             vector<ll>
#define all(x)          (x).begin(), (x).end()
#define rall(x)         (x).rbegin(), (x).rend()
#define sz(x)           ((int)(x).size())
#define pb              push_back
#define ppb             pop_back
#define mp              make_pair
#define fi              first
#define se              second
#define str             string
#define fo(i,a,b)       for(ll i=(a);i<=(b);++i)
#define fod(i,a,b)      for(ll i=(a);i>=(b);--i)
#define trav(x, v)      for(auto &x : v)
#define bit(x,i)        ((x) & (1<<(i)))
#define lowbit(x)       ((x) & -(x))
#define pcnt(x)         __builtin_popcountll(x)
#define lcm(a,b)        (1ll * ((a) / gcd((a), (b))) * (b))
const ll INF =          (ll)4e18;
const ll MOD =          1e9 + 7;
#define ADD(a,b)        (((a)+(b))%MOD)
#define MUL(a,b)        (((a)*(b))%MOD)
#define uniq(x)         ((x).erase(unique(all(x)), (x).end()))
#define cnt(x,val)      (ll)(count(all(x), val))
#define lb(x,val)       (int)(lower_bound(all(x), val) - (x).begin())
#define ub(x,val)       (int)(upper_bound(all(x), val) - (x).begin())
#define fast            ios_base::sync_with_stdio(0);cin.tie(0);cout.tie(0);
#define ghifile(n)\
    freopen(n".inp","r",stdin);\
    freopen(n".out", "w", stdout);





main(){
  //ghifile("VBAUCU");
  fast
  ll n;cin>>n;
  cout<<n/10<<"\n"<<n%10;
  
  
  
  
  





  
  
  
  
  
  
}