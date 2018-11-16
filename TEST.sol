pragma solidity ^0.4.24;

/// https://github.com/cryptofinlabs/bskt/blob/master/contracts/BsktToken.sol
/// just testing syntax highlighting
library AddressArrayUtils {

    /// @return Returns index and ok for the first occurrence starting from
    /// index 0
    function index(address[] addresses, address a)
        internal pure returns (uint, bool)
    {
        for (uint i = 0; i < addresses.length; i++) {
            if (addresses[i] == a) {
                return (i, true);
            }
        }
        return (0, false);
    }

}
