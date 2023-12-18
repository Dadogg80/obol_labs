import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { parseEther } from 'ethers';


describe("Optimised", function () {

  const initialBalance = parseEther("1");
  const TWO_WEEKS = 60 * 60 * 24 * 14;

  const advanceTime = async () => {
    await ethers.provider.send("evm_increaseTime", [TWO_WEEKS]);
    await ethers.provider.send("evm_mine", []);
  };

  
  async function deployOptimizedFixture() {
      const [...accounts] = await ethers.getSigners();
      const contributors = accounts.slice(0, 6).map((account) => account.address);
      
      const OptimizedContract = await ethers.getContractFactory("OptimizedContract");
      const optimized = await OptimizedContract.deploy({ value: initialBalance });
      
      return { contributors, optimized };
    };
    
    describe("Optimized Contract", function () {
        
        it("Should deploy the contract and set the contributors", async function () {
            const { contributors, optimized } = await loadFixture(deployOptimizedFixture);
            console.log(await optimized.getAddress());
            console.log(contributors);
        });
        /* 
        it("Should revert with custom error 'Code1()'", async function () {
            const { optimized } = await loadFixture(deployOptimizedFixture);
            await expect(optimized.distribute()).to.be.revertedWithCustomError(optimized, 'Code1()');
        }); */

        it("should successfully distribute funds after 'distributeTime'", async function () {
            const { optimized, contributors } = await loadFixture(deployOptimizedFixture);
            
            advanceTime();
            const tx = await optimized.distribute(contributors);
            const receipt = await tx.wait();
            expect(receipt?.status).to.equal(1);
        });
        
    });
});
