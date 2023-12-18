// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

contract OptimizedContract {

    /// @notice Code1 is emitted if a distribute transaction fails.
    /// @dev Read documentation section {error_codes} for detailed description of all error codes.
    error Code1();

    constructor() payable {}

    function distribute(address[] calldata recipients) external {
        uint256 _bal = address(this).balance;

        uint256 _amount = (_bal / recipients.length);

        for(uint256 i = 0; i < recipients.length;) {
            (bool success, ) = recipients[i].call{value : _amount}("");
            if(!success) revert Code1();
            unchecked {
                ++i;
            }
        }

    }
}