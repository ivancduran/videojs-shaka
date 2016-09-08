'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * videojs-shaka.js
 *
 * License can be found in the LICENSE file.
 *
 * @copyright 2016 halibegic
 * @author halibegic <hasan461@gmail.com>
 */

var Html5 = videojs.getComponent('Html5');

var ShakaTech = function (_Html) {
    _inherits(ShakaTech, _Html);

    function ShakaTech(options, ready) {
        _classCallCheck(this, ShakaTech);

        var source = options.source;
        delete options.source;

        var _this = _possibleConstructorReturn(this, (ShakaTech.__proto__ || Object.getPrototypeOf(ShakaTech)).call(this, options, ready));

        shaka.polyfill.installAll();

        var video = _this.el();

        _this.shakaPlayer = new shaka.Player(video);

        _this.shakaPlayer.addEventListener('error', function (e) {
            videojs(_this.options_.playerId).trigger('error', e);
        });

        if (typeof options.drm != 'undefined') {

            _this.shakaPlayer.configure({
                drm: options.drm
            });
        }

        _this.shakaPlayer.load(source.src);
        return _this;
    }

    _createClass(ShakaTech, null, [{
        key: 'isSupported',
        value: function isSupported() {
            return !!window.MediaSource;
        }
    }, {
        key: 'canPlaySource',
        value: function canPlaySource(srcObj) {
            return srcObj.type === 'application/dash+xml' ? 'maybe' : '';
        }
    }]);

    return ShakaTech;
}(Html5);

videojs.registerTech('Shaka', ShakaTech);
videojs.options.techOrder.unshift('Shaka');
//# sourceMappingURL=videojs-shaka.js.map