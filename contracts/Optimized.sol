// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

contract Optimized {
    address[6] internal contributors;
    uint256 internal immutable distributeTime;

    /// @notice Code1 is emitted when the distribute function is called before the distributeTime
    /// @dev Read documentation section {error_codes} for detailed description of all error codes.
    error Code1();

    constructor(address[6] memory _contributors) payable {
        distributeTime = block.timestamp + 2 weeks;
        contributors = _contributors;
    }

    function distribute() external {
        if(block.timestamp < distributeTime) revert Code1();

        uint256 amount = address(this).balance / 6;

        payable(contributors[0]).transfer(amount);
        payable(contributors[1]).transfer(amount);
        payable(contributors[2]).transfer(amount);
        payable(contributors[3]).transfer(amount);
        payable(contributors[4]).transfer(amount);
        payable(contributors[5]).transfer(amount);
    }
}