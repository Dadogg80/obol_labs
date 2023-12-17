import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { parseEther } from 'ethers';


describe("Distribute", function () {

  const initialBalance = parseEther("1");
  const TWO_WEEKS = 60 * 60 * 24 * 14;

  const advanceTime = async () => {
    await ethers.provider.send("evm_increaseTime", [TWO_WEEKS]);
    await ethers.provider.send("evm_mine", []);
  };

  
  async function deployDistributeFixture() {
      const [...accounts] = await ethers.getSigners();
      const contributors = accounts.slice(0, 6).map((account) => account.address);
      
      const DistributeContract = await ethers.getContractFactory("Distribute");
      const distribute = await DistributeContract.deploy(contributors, { value: initialBalance });
      
      return { contributors, distribute };
    };
    
    describe("Optimized Contract", function () {
        
        it("Should deploy the contract and set the contributors", async function () {
            const { contributors, distribute } = await loadFixture(deployDistributeFixture);
            console.log(await distribute.getAddress());
            console.log(contributors);
        });
        
        it("should revert with 'cannot call distribute yet' if distribute is called too early", async function () {
            const { distribute } = await loadFixture(deployDistributeFixture);
            await expect(distribute.distribute()).to.be.revertedWith("cannot call distribute yet");
        });
        
        it("should successfully distribute funds after 'distributeTime'", async function () {
            const { distribute } = await loadFixture(deployDistributeFixture);
            
            advanceTime();

            const tx = await distribute.distribute();
            const receipt = await tx.wait();
            
            expect(receipt?.status).to.equal(1);
        });
        
    });
});

