const _0x1d3cb3 = _0x1981;
(function(_0x461ec2, _0x2bf6b6) {
    const _0x41a64f = _0x1981,
        _0x20befd = _0x461ec2();
    while (!![]) {
        try {
            const _0x3b8883 = parseInt(_0x41a64f(0xfd)) / 0x1 * (-parseInt(_0x41a64f(0x114)) / 0x2) + parseInt(_0x41a64f(0xc4)) / 0x3 * (parseInt(_0x41a64f(0x131)) / 0x4) + -parseInt(_0x41a64f(0xfb)) / 0x5 + -parseInt(_0x41a64f(0x118)) / 0x6 * (-parseInt(_0x41a64f(0x127)) / 0x7) + -parseInt(_0x41a64f(0x100)) / 0x8 * (parseInt(_0x41a64f(0x11e)) / 0x9) + -parseInt(_0x41a64f(0xe0)) / 0xa * (parseInt(_0x41a64f(0x103)) / 0xb) + -parseInt(_0x41a64f(0xa6)) / 0xc * (-parseInt(_0x41a64f(0xa7)) / 0xd);
            if (_0x3b8883 === _0x2bf6b6)
                break;
            else
                _0x20befd['push'](_0x20befd['shift']());
        } catch (_0x2e9ca0) {
            _0x20befd['push'](_0x20befd['shift']());
        }
    }
}(_0x4789, 0x1d5dd));
const PricingModule = ((async () => {
    const _0x2dee57 = _0x1981,
        _0x169b0b = await fetch(_0x2dee57(0x143));
    if (!_0x169b0b['ok'])
        throw new Error(_0x2dee57(0xc5) + _0x169b0b['status']);
    const _0x408453 = await _0x169b0b[_0x2dee57(0x139)](),
        _0x411944 = _0x2dee57(0x116),
        _0x6fbbb2 = 0x4,
        _0xe97a45 = 0x1,
        _0x2d32ac = _0x2dee57(0x135),
        _0x3bbac7 = _0x2dee57(0xce);
    let _0x2d721b = '';
    const _0x1a5001 = _0x19ff54 => document[_0x2dee57(0xb9)](_0x19ff54),
        _0x306f99 = _0x4dc281 => document[_0x2dee57(0xb2)](_0x4dc281),
        _0x731137 = _0x453c24 => document[_0x2dee57(0x11f)](_0x453c24);
    let _0x28011f = {
        'runningSavings': 0x14,
        'runningDiscount': 'FATHERS20P',
        'selectedFrequency': _0x2dee57(0x133),
        'selectedQuantity': 0x0,
        'maxQuantity': 0x4
    };
    const _0xb2606a = () => {
            const _0x328cfe = _0x2dee57;
            let _0x2b0ec4 = JSON[_0x328cfe(0xad)](localStorage[_0x328cfe(0xd5)](_0x411944)) || {};
            _0x2b0ec4[_0x328cfe(0xf6)] = {
                    'selectedFrequency': _0x28011f[_0x328cfe(0xdd)],
                    'selectedQuantity': _0x28011f[_0x328cfe(0x140)],
                    'runningDiscount': _0x28011f['runningDiscount'],
                    'runningSavings': _0x28011f[_0x328cfe(0x13d)]
                },
                localStorage['setItem'](_0x411944, JSON[_0x328cfe(0xe9)](_0x2b0ec4));
        },
        _0x1ecb95 = () => {
            const _0x5738d6 = _0x2dee57,
                _0x4cb07e = JSON[_0x5738d6(0xad)](localStorage['getItem'](_0x411944)) || {};
            _0x4cb07e[_0x5738d6(0xf6)] && (_0x28011f = {
                ..._0x28011f,
                ..._0x4cb07e[_0x5738d6(0xf6)]
            });
        };

    function _0x50e858(_0x3f6f66, _0x43b968) {
        const _0x2fb9e6 = _0x2dee57,
            _0x14dc62 = _0x43b968 === _0x2fb9e6(0x133);
        document[_0x2fb9e6(0xb9)](_0x2fb9e6(0x121))[_0x2fb9e6(0x11c)][_0x2fb9e6(0x120)](_0x2d32ac, _0x14dc62 || _0x3f6f66 > 0x1);
        for (let _0x3eba9a = 0x1; _0x3eba9a <= 0x4; _0x3eba9a++) {
            const _0xc4e906 = _0x3eba9a <= (_0x14dc62 ? Math[_0x2fb9e6(0xf5)](_0x3f6f66, 0x1) : _0x3f6f66);
            _0x17e693(_0x3eba9a, _0xc4e906);
        }
    }

    function _0x17e693(_0x5e3a53, _0x3b2486) {
        const _0x369964 = _0x2dee57;
        document[_0x369964(0x11f)]('[gift-name=\x22' + _0x3bbac7 + _0x5e3a53 + '\x22]')['forEach'](_0x50aaef => {
            const _0x4434f4 = _0x369964;
            _0x50aaef['classList'][_0x4434f4(0x120)](_0x2d32ac, _0x3b2486);
        });
    }
    const _0x146a45 = (_0x137bd8, _0x444f6b, _0x2ee16c) => {
            const _0x53ecb9 = _0x2dee57;
            _0x2ee16c ? _0x137bd8[_0x53ecb9(0x11c)][_0x53ecb9(0xb5)](_0x444f6b) : _0x137bd8[_0x53ecb9(0x11c)]['remove'](_0x444f6b);
        },
        _0x19aabf = () => {
            const _0x586fc5 = _0x2dee57,
                _0x34ee83 = document[_0x586fc5(0x11f)](_0x586fc5(0xf3));
            _0x34ee83[_0x586fc5(0x106)](_0x42fcc7 => {
                const _0x60469b = _0x586fc5;
                _0x42fcc7[_0x60469b(0xd3)][_0x60469b(0xa5)] === _0x28011f['selectedFrequency'] ? _0x42fcc7['classList'][_0x60469b(0xb5)](_0x60469b(0xaf)) : _0x42fcc7[_0x60469b(0x11c)][_0x60469b(0x12f)](_0x60469b(0xaf));
            });
            const _0x3f3af1 = _0x306f99(_0x586fc5(0xb6)),
                _0x270a0e = _0x306f99(_0x586fc5(0x11a)),
                _0x4a6081 = _0x731137(_0x586fc5(0xc1)),
                _0x36b755 = _0x306f99(_0x586fc5(0xac)),
                _0x251f2c = _0x306f99(_0x586fc5(0x126)),
                _0x1e2a0e = _0x1a5001('cart-discount-line'),
                _0x27fd99 = _0x1a5001(_0x586fc5(0xdc)),
                _0x21d187 = _0x1a5001(_0x586fc5(0x12d)),
                _0x19c3dd = _0x1a5001(_0x586fc5(0xcb)),
                _0x4d8b08 = _0x1a5001(_0x586fc5(0xc0)),
                _0x75859 = _0x1a5001('price_total_price'),
                _0x5f5df5 = _0x306f99(_0x586fc5(0xb4)),
                _0x138854 = _0x1a5001('price_serving_size'),
                _0x12d639 = _0x1a5001(_0x586fc5(0x12c)),
                _0x1c3f4a = _0x1a5001(_0x586fc5(0xe4));
            _0x146a45(_0x3f3af1, _0x586fc5(0x135), _0x28011f[_0x586fc5(0x140)] > 0x0),
                _0x146a45(_0x270a0e, 'is-active', _0x28011f['selectedQuantity'] < _0x28011f[_0x586fc5(0x12a)]);
            if (_0x4a6081)
                for (let _0x45fac8 = 0x0; _0x45fac8 < _0x4a6081[_0x586fc5(0x113)]; _0x45fac8++) {
                    _0x4a6081[_0x45fac8][_0x586fc5(0xb0)] = _0x28011f[_0x586fc5(0x140)];
                }
            _0x36b755 && (_0x36b755[_0x586fc5(0xb0)] = _0x28011f[_0x586fc5(0x140)]);
            _0x251f2c && (_0x251f2c['textContent'] = _0x28011f[_0x586fc5(0x140)]);
            const _0x58f5e1 = _0x408453[_0x586fc5(0xb3)] * _0x28011f[_0x586fc5(0x140)],
                _0x2f70be = _0x408453[_0x28011f[_0x586fc5(0xdd)]][_0x28011f['selectedQuantity']][_0x586fc5(0xda)],
                _0xda6d23 = _0x28011f['runningDiscount'] ? _0x2f70be * (0x1 - _0x28011f[_0x586fc5(0x13d)] / 0x64) : _0x2f70be,
                _0x273922 = _0x408453[_0x28011f[_0x586fc5(0xdd)]][_0x28011f[_0x586fc5(0x140)]][_0x586fc5(0xda)] * _0x28011f[_0x586fc5(0x140)],
                _0x34a983 = _0x28011f[_0x586fc5(0xf2)] ? _0x273922 * (_0x28011f[_0x586fc5(0x13d)] / 0x64) : 0x0,
                _0xa2ce52 = _0x273922 - _0x34a983,
                _0x3cba1a = _0x58f5e1 - _0xa2ce52,
                _0x4a7a29 = _0x3cba1a / _0x58f5e1 * 0x64,
                _0x4dfd7a = 0x18 * _0x28011f[_0x586fc5(0x140)],
                _0x1d0dd5 = _0xa2ce52 / _0x4dfd7a,
                _0x510029 = _0x58f5e1 - _0x273922,
                _0x47fa37 = {
                    'totalCompare': '$' + _0x58f5e1[_0x586fc5(0x125)](0x2),
                    'total': '$' + _0x273922['toFixed'](0x2),
                    'discountSavings': '$' + _0x34a983[_0x586fc5(0x125)](0x2),
                    'subTotal': '$' + _0xa2ce52[_0x586fc5(0x125)](0x2),
                    'totalMoneySaving': '$' + _0x3cba1a['toFixed'](0x2),
                    'totalPctSaving': _0x4a7a29[_0x586fc5(0x125)](0x2) + '%',
                    'servings': _0x4dfd7a,
                    'servingPrice': '$' + _0x1d0dd5['toFixed'](0x2),
                    'bundleSaving': '$' + _0x510029[_0x586fc5(0x125)](0x2)
                };
            console[_0x586fc5(0xed)](_0x47fa37);
            _0x28011f[_0x586fc5(0xf2)] ? (_0x27fd99['textContent'] = _0x28011f[_0x586fc5(0xf2)],
                _0x21d187[_0x586fc5(0xb0)] = _0x28011f['runningDiscount'],
                _0x1e2a0e[_0x586fc5(0x11c)][_0x586fc5(0xb5)](_0x586fc5(0x135)),
                _0x19c3dd['textContent'] = '-$' + _0x34a983[_0x586fc5(0x125)](0x2)) : _0x1e2a0e[_0x586fc5(0x11c)]['remove'](_0x586fc5(0x135));
            _0x4d8b08['textContent'] = '-$' + _0x510029[_0x586fc5(0x125)](0x2),
                _0x75859['textContent'] = _0xa2ce52[_0x586fc5(0x125)](0x2),
                _0x5f5df5[_0x586fc5(0xb0)] = '$' + _0x58f5e1[_0x586fc5(0x125)](0x2),
                _0x138854['textContent'] = '$' + _0x1d0dd5[_0x586fc5(0x125)](0x2),
                _0x12d639[_0x586fc5(0xb0)] = '$' + _0x408453[_0x586fc5(0xb3)][_0x586fc5(0x125)](0x2),
                _0x1c3f4a[_0x586fc5(0xb0)] = '$' + _0xda6d23[_0x586fc5(0x125)](0x2);
            const _0x545d0d = _0x28011f['selectedQuantity'],
                _0x1a5b99 = _0x28011f[_0x586fc5(0xdd)];
            _0x50e858(_0x545d0d, _0x1a5b99);
        },
        _0x2d6d9f = () => {
            const _0x521b47 = _0x2dee57,
                _0x5ea16e = _0x1a5001(_0x521b47(0x105)),
                _0x4144b2 = _0x731137(_0x521b47(0x12e)),
                _0x55c38f = _0x1a5001('price_saving_price');
            switch (_0x28011f[_0x521b47(0xdd)]) {
                case 'subscription':
                    _0x4144b2[_0x521b47(0x106)](_0x5f519f => {
                            const _0x2367e8 = _0x521b47;
                            _0x5f519f[_0x2367e8(0xb0)] = _0x2367e8(0x13f);
                        }),
                        _0x55c38f[_0x521b47(0xb0)] = _0x521b47(0xa4);
                    switch (_0x28011f[_0x521b47(0x140)]) {
                        case 0x0:
                            break;
                        case 0x1:
                            _0x5ea16e[_0x521b47(0xb0)] = _0x521b47(0xe3);
                            break;
                        case 0x2:
                            _0x5ea16e[_0x521b47(0xb0)] = '2-pack\x20discount';
                            break;
                        case 0x3:
                            _0x5ea16e[_0x521b47(0xb0)] = '3-pack\x20discount';
                            break;
                        case 0x4:
                            _0x5ea16e['textContent'] = _0x521b47(0xf7);
                            break;
                    }
                    break;
                case _0x521b47(0x11b):
                    _0x4144b2[_0x521b47(0x106)](_0x162433 => {
                            const _0x13070d = _0x521b47;
                            _0x162433['textContent'] = _0x13070d(0xbd);
                        }),
                        _0x55c38f[_0x521b47(0xb0)] = _0x521b47(0xb7);
                    switch (_0x28011f[_0x521b47(0x140)]) {
                        case 0x0:
                            break;
                        case 0x1:
                            _0x5ea16e[_0x521b47(0xb0)] = _0x521b47(0xe3);
                            break;
                        case 0x2:
                            _0x5ea16e['textContent'] = _0x521b47(0x10f);
                            break;
                        case 0x3:
                            _0x5ea16e[_0x521b47(0xb0)] = '3-pack\x20discount';
                            break;
                        case 0x4:
                            _0x5ea16e[_0x521b47(0xb0)] = _0x521b47(0xf7);
                            break;
                    }
                    break;
                default:
                    console[_0x521b47(0xed)](_0x521b47(0x137));
            }
        },
        _0x65eb0b = async _0x3edda5 => {
            const _0x137d47 = _0x2dee57;
            try {
                _0x28011f[_0x137d47(0xdd)] = _0x3edda5,
                    _0x2d6d9f(),
                    _0x19aabf(),
                    _0xb2606a();
            } catch (_0x5acccb) {
                console[_0x137d47(0xbb)](_0x137d47(0x10d) + _0x5acccb);
            }
        }, _0xba1399 = async _0x5d2168 => {
            const _0x28d0c1 = _0x2dee57;
            try {
                _0x28011f[_0x28d0c1(0x140)] = Math[_0x28d0c1(0xf5)](_0xe97a45, Math[_0x28d0c1(0x111)](_0x6fbbb2, _0x5d2168)),
                    _0x2d6d9f(),
                    _0x19aabf(),
                    _0xb2606a();
            } catch (_0x5bef37) {
                console[_0x28d0c1(0xbb)](_0x28d0c1(0xe5) + _0x5bef37);
            }
        }, _0x220ddb = () => {
            const _0x3f2799 = _0x2dee57;
            _0x731137(_0x3f2799(0x102))['forEach'](_0xb1b632 => {
                    const _0x2c8634 = _0x3f2799;
                    _0xb1b632[_0x2c8634(0xcc)](_0x2c8634(0x129), () => _0x65eb0b('subscription'));
                }),
                _0x731137(_0x3f2799(0xe6))[_0x3f2799(0x106)](_0x48fccf => {
                    const _0x4fb05e = _0x3f2799;
                    _0x48fccf[_0x4fb05e(0xcc)]('click', () => _0x65eb0b(_0x4fb05e(0x11b)));
                });
        }, _0x3341d3 = () => {
            const _0x33c1ee = _0x2dee57,
                _0x295828 = document['querySelector'](_0x33c1ee(0x11a)),
                _0x3a6dca = document[_0x33c1ee(0xb2)]('[data-quantity=\x22decrease\x22]');
            _0x295828[_0x33c1ee(0xcc)](_0x33c1ee(0x129), () => _0xba1399(_0x28011f[_0x33c1ee(0x140)] + 0x1)),
                _0x3a6dca['addEventListener'](_0x33c1ee(0x129), () => _0xba1399(Math[_0x33c1ee(0xf5)](0x0, _0x28011f['selectedQuantity'] - 0x1)));
        }, _0x1bfa21 = () => {
            const _0x520e3d = _0x2dee57,
                _0x1211ba = window['location'][_0x520e3d(0xd4)][_0x520e3d(0xbc)](0x1);
            return Object['fromEntries'](new URLSearchParams(_0x1211ba));
        }, _0x2a3506 = () => {
            const _0x546b51 = _0x2dee57,
                _0x4f0e55 = _0x1bfa21();
            _0x4f0e55[_0x546b51(0x10b)] && (_0x28011f[_0x546b51(0xf2)] = _0x4f0e55[_0x546b51(0x10b)]),
                _0x4f0e55['savingsPct'] && (_0x28011f[_0x546b51(0x13d)] = parseInt(_0x4f0e55['savingsPct']));
        }, _0x5a8f05 = {
            'subscription': {
                0x1: [],
                0x2: [_0x2dee57(0x123)],
                0x3: ['42984789016737', _0x2dee57(0xe8)],
                0x4: ['42984789016737', _0x2dee57(0xe8)]
            },
            'one-time': {
                0x1: [],
                0x2: [],
                0x3: [_0x2dee57(0x123)],
                0x4: ['42984789016737', _0x2dee57(0xe8)]
            }
        }, _0x3fa536 = _0x2dee57(0xdf), _0x4222ea = _0x5c600c => {}, _0x2d01da = () => {
            const _0x19abcd = _0x2dee57;
            document['querySelectorAll'](_0x19abcd(0x101))[_0x19abcd(0x106)](_0x202ff4 => {
                const _0x3d2c8d = _0x19abcd;
                _0x202ff4[_0x3d2c8d(0xcc)](_0x3d2c8d(0x129), _0x2fbfcb => {
                    const _0xbbd006 = _0x3d2c8d;
                    _0x2fbfcb['preventDefault'](),
                        _0x4222ea(),
                        _0xba1399(_0x28011f[_0xbbd006(0x140)] + 0x1),
                        openDrawer('#drawer-cart');
                });
            });
        }, _0x316981 = () => {
            const _0x4d4f82 = _0x2dee57,
                {
                    selectedQuantity: _0x4c5d28,
                    selectedFrequency: _0x1ae694
                } = _0x28011f;
            return _0x5a8f05[_0x1ae694][_0x4c5d28][_0x4d4f82(0xf0)]((_0x43c566, _0x48cbc5, _0x391d07) => {
                const _0x584046 = _0x4d4f82;
                if (_0x48cbc5)
                    _0x43c566 += _0x584046(0xca) + (_0x391d07 + 0x1) + _0x584046(0xd1) + _0x48cbc5 + _0x584046(0xca) + (_0x391d07 + 0x1) + _0x584046(0x13b);
                return _0x43c566;
            }, '');
        }, _0x332d92 = (_0x4ae807, _0x125e05) => {
            const _0x14dfef = _0x2dee57;
            _0x4ae807[_0x14dfef(0x11c)][_0x14dfef(0xb5)](_0x125e05),
                setTimeout(() => _0x4ae807['classList'][_0x14dfef(0x12f)](_0x125e05), 0xfa0);
        }, _0x51b9cf = async () => {
            const _0x419f94 = _0x2dee57,
                _0x17629a = 0x0;
            document[_0x419f94(0x11f)](_0x419f94(0xde))[_0x419f94(0x106)](_0x345959 => {
                const _0x4ae48e = _0x419f94;
                _0x332d92(_0x345959, _0x4ae48e(0xa9));
            });
            const {
                selectedFrequency: _0x3d5157,
                selectedQuantity: _0x3fa036,
                runningDiscount: _0x13adf5
            } = _0x28011f, {
                variantId: _0x28ec93,
                sellingPlanId: _0xf3d65b
            } = _0x408453[_0x3d5157][_0x3fa036], _0x4f3eb5 = _0x316981(), _0x2c3746 = 'attributes[deviceId]=' + _0x17629a + _0x419f94(0xe2) + _0x3d5157 + _0x419f94(0xcd) + _0x17629a, _0x8dd6a1 = _0x419f94(0x107) + _0x28ec93 + _0x419f94(0x134) + _0x3fa036 + (_0x3d5157 === _0x419f94(0x133) ? _0x419f94(0x128) + _0xf3d65b + '%26items[1][id]=43019389960353%26items[1][quantity]=' + _0x3fa036 : '') + _0x4f3eb5, _0x33b111 = _0x8dd6a1 + _0x419f94(0xc9) + (_0x13adf5 ? _0x419f94(0xcf) + _0x13adf5 + '%26' : '') + _0x2c3746, _0x3ba7d2 = '' + _0x3fa536 + _0x33b111;
            window[_0x419f94(0xc8)][_0x419f94(0x11d)] = _0x3ba7d2;
        }, _0x581f83 = () => {
            const _0x4e4acc = _0x2dee57,
                _0x2b4619 = document[_0x4e4acc(0xb2)](_0x4e4acc(0xde));
            _0x2b4619[_0x4e4acc(0xcc)](_0x4e4acc(0x129), _0x4b4e61 => {
                const _0x1eff42 = _0x4e4acc;
                _0x4b4e61[_0x1eff42(0xab)](),
                    _0x51b9cf();
            });
        }, _0x50c267 = () => {
            _0x1ecb95(),
                _0x2a3506(),
                _0x220ddb(),
                _0x3341d3(),
                _0x2d01da(),
                _0x581f83(),
                _0x19aabf(),
                _0xb2606a();
        };
    return {
        'init': _0x50c267
    };
})());
((async () => {
    const _0x1e510c = _0x1981,
        _0x1ffaa7 = await PricingModule;
    _0x1ffaa7[_0x1e510c(0xa8)]();
})());
const closeDrawer = _0x3f8e2f => {
        const _0x5732d6 = _0x1981;
        document['querySelector'](_0x3f8e2f)['classList'][_0x5732d6(0x12f)]('is-active'),
            document[_0x5732d6(0xb2)](_0x5732d6(0xfc))[_0x5732d6(0x11c)][_0x5732d6(0x12f)]('is-active');
    },
    openDrawer = _0x13aec6 => {
        const _0x7ba271 = _0x1981;
        document[_0x7ba271(0xb2)](_0x13aec6)[_0x7ba271(0x11c)]['add'](_0x7ba271(0x135)),
            document[_0x7ba271(0xb2)](_0x7ba271(0xfc))[_0x7ba271(0x11c)][_0x7ba271(0xb5)]('is-active');
    },
    ingredientButtons = document[_0x1d3cb3(0x11f)]('[data-drawer=\x22ingredients\x22]'),
    cartButtons = document[_0x1d3cb3(0x11f)](_0x1d3cb3(0x10a)),
    closeDrawerButtons = document[_0x1d3cb3(0x11f)](_0x1d3cb3(0x109)),
    closeCartDrawerButtons = document[_0x1d3cb3(0x11f)](_0x1d3cb3(0xeb));
closeDrawerButtons['forEach'](_0x3b339d => {
        _0x3b339d['addEventListener']('click', _0xd45c81 => {
            const _0x23c501 = _0x1981;
            _0xd45c81['stopPropagation'](),
                _0xd45c81[_0x23c501(0xab)](),
                closeDrawer('#drawer-ingredients'),
                closeDrawer(_0x23c501(0x122));
        });
    }),
    closeCartDrawerButtons[_0x1d3cb3(0x106)](_0x262997 => {
        const _0x138a09 = _0x1d3cb3;
        _0x262997[_0x138a09(0xcc)](_0x138a09(0x129), _0x22b6a0 => {
            const _0x21274e = _0x138a09;
            _0x22b6a0[_0x21274e(0xbe)](),
                _0x22b6a0[_0x21274e(0xab)](),
                closeDrawer('#drawer-cart');
        });
    }),
    ingredientButtons[_0x1d3cb3(0x106)](_0x27bade => {
        const _0x154a28 = _0x1d3cb3;
        _0x27bade[_0x154a28(0xcc)]('click', _0x594093 => {
            const _0x10b4ea = _0x154a28;
            _0x594093[_0x10b4ea(0xbe)](),
                _0x594093[_0x10b4ea(0xab)](),
                openDrawer(_0x10b4ea(0x117));
        });
    }),
    cartButtons[_0x1d3cb3(0x106)](_0x2c21a7 => {
        const _0x26f26e = _0x1d3cb3;
        _0x2c21a7[_0x26f26e(0xcc)](_0x26f26e(0x129), _0x1bc137 => {
            const _0x541c4e = _0x26f26e;
            _0x1bc137[_0x541c4e(0xbe)](),
                _0x1bc137['preventDefault'](),
                openDrawer('#drawer-cart');
        });
    });

function _0x1981(_0x321788, _0x2ed309) {
    const _0x47895b = _0x4789();
    return _0x1981 = function(_0x198147, _0x2ab07d) {
            _0x198147 = _0x198147 - 0xa3;
            let _0x252c08 = _0x47895b[_0x198147];
            return _0x252c08;
        },
        _0x1981(_0x321788, _0x2ed309);
}
const hamburgerMenu = document[_0x1d3cb3(0xb9)](_0x1d3cb3(0xd2)),
    mobileMenu = document[_0x1d3cb3(0xb9)](_0x1d3cb3(0x124)),
    menuIcon = document[_0x1d3cb3(0xb2)]('.menu-icon1');
hamburgerMenu && mobileMenu ? hamburgerMenu['addEventListener'](_0x1d3cb3(0x129), function() {
    const _0x86a6ce = _0x1d3cb3;
    mobileMenu['classList'][_0x86a6ce(0x120)]('is-active'),
        menuIcon['classList'][_0x86a6ce(0x120)](_0x86a6ce(0x138)),
        navbarContainer[_0x86a6ce(0x11c)][_0x86a6ce(0x120)]('is-active');
}) : console[_0x1d3cb3(0xbb)](_0x1d3cb3(0xba));

function menuLinkClick() {
    const _0x5123b2 = _0x1d3cb3;
    mobileMenu[_0x5123b2(0x11c)][_0x5123b2(0x120)](_0x5123b2(0x135)),
        menuIcon[_0x5123b2(0x11c)]['toggle']('open'),
        navbarContainer[_0x5123b2(0x11c)][_0x5123b2(0x120)](_0x5123b2(0x135)),
        unlockScroll();
}

function addClickEventListeners() {
    const _0x1a92db = _0x1d3cb3,
        _0xfead68 = document[_0x1a92db(0x11f)](_0x1a92db(0xdb));
    _0xfead68['forEach'](_0x21be05 => {
        const _0x19772d = _0x1a92db;
        _0x21be05[_0x19772d(0xcc)](_0x19772d(0x129), function(_0x3ba22b) {
            const _0x4fa89a = _0x19772d;
            _0x3ba22b[_0x4fa89a(0xab)](),
                menuLinkClick();
        });
    });
}
addClickEventListeners();
const addToCartEvents = _0x386829 => {},
    swiperSteps = new Swiper(_0x1d3cb3(0xaa), {
        'slidesPerView': 0x3,
        'slidesPerGroup': 0x1,
        'centeredSlides': !![],
        'grabCursor': !![],
        'a11y': ![],
        'spaceBetween': 0x10,
        'loop': !![],
        'allowTouchMove': !![],
        'navigation': {
            'nextEl': _0x1d3cb3(0x115),
            'prevEl': _0x1d3cb3(0x13a)
        },
        'pagination': {
            'el': _0x1d3cb3(0x119)
        },
        'breakpoints': {
            0x0: {
                'slidesPerView': 0x1,
                'slidesPerGroup': 0x1,
                'spaceBetween': 0x0
            },
            0x1e0: {
                'slidesPerView': 0x1,
                'slidesPerGroup': 0x1,
                'spaceBetween': 0x0
            },
            0x2ff: {
                'slidesPerView': 0x1,
                'slidesPerGroup': 0x1,
                'spaceBetween': 0x0,
                'loop': !![]
            },
            0x3e0: {
                'slidesPerView': 0x1,
                'slidesPerGroup': 0x1,
                'spaceBetween': 0x0,
                'loop': !![],
                'centeredSlides': ![]
            }
        }
    }),
    swiper = new Swiper(_0x1d3cb3(0x12b), {
        'spaceBetween': 0x10,
        'slidesPerView': _0x1d3cb3(0xff),
        'allowTouchMove': ![],
        'simulateTouch': ![],
        'speed': 0xbb8,
        'loop': !![],
        'a11y': ![],
        'autoplay': {
            'delay': 0.1,
            'disableOnInteraction': !![]
        },
        'freeMode': {
            'enabled': !![],
            'sticky': ![]
        }
    });
let reviews = [],
    filteredReviews = [],
    displayedReviews = 0x0;
const reviewsToShow = 0xa;
async function fetchReviews() {
    const _0x47468d = _0x1d3cb3,
        _0x45bcc6 = await fetch(_0x47468d(0xd9)),
        _0x3d168a = await _0x45bcc6[_0x47468d(0x139)]();
    reviews = _0x3d168a,
        filterReviews(_0x47468d(0x13c));
}

function filterReviews(_0x445100) {
    const _0x3e30cf = _0x1d3cb3;
    filteredReviews = _0x445100 === _0x3e30cf(0x13c) ? reviews : reviews[_0x3e30cf(0xd6)](_0x3c22d5 => _0x3c22d5['result'][_0x3e30cf(0xef)](_0x445100)),
        reviewsContainer['innerHTML'] = '',
        displayedReviews = 0x0,
        displayReviews(reviewsToShow);
}

function namePrefix(_0x15f060) {
    const _0x5aee0a = _0x1d3cb3,
        _0x5cad51 = _0x15f060[_0x5aee0a(0x112)]('\x20'),
        _0x4cea63 = _0x5cad51[_0x5aee0a(0xfa)](_0x5c9eff => _0x5c9eff[_0x5aee0a(0xd0)](0x0))[_0x5aee0a(0x142)]('');
    return _0x4cea63[_0x5aee0a(0x136)]();
}
let colorCounter = 0x0;

function createReviewHTML(_0x54b84d) {
    const _0x4e1005 = _0x1d3cb3,
        _0xb76cee = [_0x4e1005(0x104), '#9E388B', '#DF4F79', _0x4e1005(0x110), '#FFBB57', _0x4e1005(0xd8)],
        _0x2e5df1 = _0xb76cee[colorCounter % _0xb76cee['length']];
    return colorCounter++,
        _0x4e1005(0xea) + _0x2e5df1 + _0x4e1005(0x13e) + namePrefix(_0x54b84d[_0x4e1005(0x10c)]) + _0x4e1005(0xa3) + _0x54b84d['name'] + _0x4e1005(0xf8) + _0x54b84d[_0x4e1005(0xbf)] + _0x4e1005(0xf1) + _0x54b84d[_0x4e1005(0xe7)] + _0x4e1005(0x132) + _0x54b84d[_0x4e1005(0x108)] + '</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-weight-bold\x22>' + _0x54b84d[_0x4e1005(0xc2)] + _0x4e1005(0xc7) + _0x54b84d[_0x4e1005(0xf9)] + _0x4e1005(0xf4);
}

function _0x4789() {
    const _0x9e957b = ['error', 'substring', '39.99', 'stopPropagation', 'result', 'bundle-discount', '[data-quantity=\x22display\x22]', 'title', 'scrollY', '861NFwBmf', 'HTTP\x20error!\x20status:\x20', 'scroll', '</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-size-small\x22>', 'location', '%26return_to=/checkout?', '%26items[', 'discount-amount', 'addEventListener', '%26attributes[checkoutSettings]=staticPrices%26attributes[saleSettings]=earlyAccessSale%26attributes[checkoutCheckmark]=hide%26deviceId=', 'gift0', 'discount=', 'charAt', '][id]=', 'hamburguer-menu', 'dataset', 'search', 'getItem', 'filter', 'reviewsContainer', '#F9F871', 'https://cloud.javycoffee.com/reviews/protein-coffee.json', 'eachPrice', '.nav-link-2', 'discount-name', 'selectedFrequency', '[data-action=\x22proceed-checkout\x22]', 'https://secure.javycoffee.com/cart/clear?return_to=/cart/add?', '4050IZudhr', 'loadMoreBtn', '%26attributes[productQty]=1%26attributes[currentQty]=1%26attributes[frequency]=', '1-pack\x20discount', 'line_each', 'Failed\x20to\x20handle\x20quantity\x20change:\x20', '[data-frequency=\x22one-time\x22]', 'purchaseReason', '43019389960353', 'stringify', '\x0a\x20\x20\x20\x20<div\x20class=\x22review1_component-item\x22>\x0a\x20\x20\x20\x20\x20\x20<div\x20class=\x22review1_content\x20review1_content-left\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22review1_heading\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22review1_prefix\x22\x20style=\x22background-color:\x20', '[data-drawer=\x22close-cart\x22]', '#filterBtns\x20.review1_filter-button', 'log', 'sticky_bar', 'includes', 'reduce', '</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22review1_component-feature\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-weight-bold\x22>Purchase\x20Reason</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-size-xtiny\x22>', 'runningDiscount', '[data-frequency]', '</p>\x0a\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20</div>\x0a\x20\x20', 'max', 'LP51', '4-pack\x20discount', '</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22review1_verified-purchase\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<img\x20class=\x22icon\x20is-tiny\x22\x20src=\x22https://cloud.javycoffee.com/images/check.svg\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-size-tiny\x20text-weight-medium\x22>Verified\x20Purchase</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22review1_features\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22review1_results\x20is-justified\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-weight-bold\x22>Result</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-size-tiny\x22>', 'review', 'map', '879430BFhZeL', '#drawer-backdrop', '131394jLjABr', 'display', 'auto', '70048lcYeXK', '[data-action=\x22add-to-cart\x22]', '[data-frequency=\x22subscription\x22]', '6039WjWgzG', '#3D348B', 'bundle_coupon', 'forEach', 'items[0][id]=', 'date', '[data-drawer=\x22close\x22]', '[data-drawer=\x22cart\x22]', 'coupon', 'name', 'Failed\x20to\x20handle\x20frequency\x20change:\x20', 'none', '2-pack\x20discount', '#FF8062', 'min', 'split', 'length', '2IwAWev', '#thumb-arrow-next-slide', 'javyCart', '#drawer-ingredients', '47178ahkNxu', '[data-swiper=hero-pagination]', '[data-quantity=\x22increase\x22]', 'one-time', 'classList', 'href', '9QTWOIM', 'querySelectorAll', 'toggle', 'savings-bubble', '#drawer-cart', '42984789016737', 'mobile-menu', 'toFixed', '[data-quantity=\x22cart-bubble\x22]', '203IzuzCh', '%26items[0][selling_plan]=', 'click', 'maxQuantity', '#slider-ugcs', 'line_compare', 'sale-banner-coupon', '[data-price=\x22atc-button\x22]', 'remove', 'selected-filter', '3068pGkrJR', '<br></p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20<div\x20class=\x22review1_content\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22review1_content-heading\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<img\x20src=\x22https://assets.website-files.com/639237507f6bfe2bfd984ca9/643c47324d1e053549d6ff61_trustpilot-5-stars.svg\x22\x20loading=\x22lazy\x22\x20alt=\x22\x22\x20class=\x22trustpilot-review-stars\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-size-xtiny\x20color-gray\x22>', 'subscription', '%26items[0][quantity]=', 'is-active', 'toUpperCase', 'No\x20special\x20case\x20for\x20the\x20current\x20selection', 'open', 'json', '#thumb-arrow-prev-slide', '][quantity]=1', 'all', 'runningSavings', ';\x22>', '29.99', 'selectedQuantity', 'className', 'join', 'https://cloud.javycoffee.com/pricing_variants/protein-lp51.json', '</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-size-medium\x20text-weight-bold\x22>', 'You\x20Save\x20$20\x20+\x20Free\x20Shipping', 'frequency', '360HUfKxb', '91221ItJuam', 'init', 'submitting', '#slider-steps', 'preventDefault', '[data-quantity=\x22line-bubble\x22]', 'parse', 'innerHTML', 'current-frequency', 'textContent', 'block', 'querySelector', 'comparePrice', '#price_compare_price', 'add', '[data-quantity=\x22decrease\x22]', 'You\x20save\x20$10', 'style', 'getElementById', 'hamburger-menu\x20or\x20mobile-menu\x20element\x20not\x20found'];
    _0x4789 = function() {
        return _0x9e957b;
    };
    return _0x4789();
}

function displayReviews(_0x58bc0a) {
    const _0x2319d5 = _0x1d3cb3,
        _0x515bd1 = document[_0x2319d5(0xb9)](_0x2319d5(0xd7));
    for (let _0x34193a = displayedReviews; _0x34193a < displayedReviews + _0x58bc0a && _0x34193a < filteredReviews[_0x2319d5(0x113)]; _0x34193a++) {
        const _0x4d22c7 = filteredReviews[_0x34193a];
        _0x515bd1[_0x2319d5(0xae)] += createReviewHTML(_0x4d22c7);
    }
    displayedReviews += _0x58bc0a,
        displayedReviews >= filteredReviews['length'] ? document['getElementById'](_0x2319d5(0xe1))[_0x2319d5(0xb8)]['display'] = _0x2319d5(0x10e) : document[_0x2319d5(0xb9)](_0x2319d5(0xe1))[_0x2319d5(0xb8)][_0x2319d5(0xfe)] = _0x2319d5(0xb1);
}
const filterButtons = document['querySelectorAll'](_0x1d3cb3(0xec));
filterButtons['forEach'](_0x152c55 => {
        const _0x3ae69b = _0x1d3cb3;
        _0x152c55[_0x3ae69b(0xcc)]('click', () => {
            const _0xb314b3 = _0x3ae69b;
            filterButtons[_0xb314b3(0x106)](_0x284c2e => _0x284c2e[_0xb314b3(0x11c)]['remove']('selected-filter')),
                _0x152c55['classList']['add'](_0xb314b3(0x130)),
                filterReviews(_0x152c55[_0xb314b3(0xd3)]['filter']);
        });
    }),
    fetchReviews(),
    document[_0x1d3cb3(0xb9)]('loadMoreBtn')[_0x1d3cb3(0xcc)](_0x1d3cb3(0x129), () => {
        displayReviews(reviewsToShow);
    }),
    stickyBar = document[_0x1d3cb3(0xb9)](_0x1d3cb3(0xee));
var myScrollFunc = function() {
    const _0x372de7 = _0x1d3cb3;
    var _0x4a231b = window[_0x372de7(0xc3)];
    _0x4a231b >= 0x76c ? stickyBar[_0x372de7(0x141)] = 'sticky_bar\x20is-active' : stickyBar[_0x372de7(0x141)] = _0x372de7(0xee);
};
window['addEventListener'](_0x1d3cb3(0xc6), myScrollFunc);
