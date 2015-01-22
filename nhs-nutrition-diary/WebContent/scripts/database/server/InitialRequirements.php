<?php

/**
 * This class is used to calculate and store the initial requirements of user i.e. when they are registering. 
 * @author Vikram Bakshi
 */
class InitialRequirements
{
	private $gender,
			$weight,
			$age,
			$activityLevel,
			$calorieRequirement,
			$proteinRequirement,
			$fluidRequirement;
	
	public function __construct($gender, $weight, $age, $activityLevel)
	{
		$this->calculateCalories($gender, $weight, $age, $activityLevel);
		$this->calculateProtein($weight);
		$this->calculateFluid($weight);
	}

	private function calculateCalories($gender, $weight, $age, $activityLevel)
	{
		$genderLowerCase = mb_strtolower($gender);
		switch($genderLowerCase)
		{
			case "female": 	$this->calorieRequirement = ($this->calculateCaloriesFemale($weight, $age))*$activityLevel ; 	break;
			case "male":	$this->calorieRequirement = ($this->calculateCaloriesMale($weight, $age))*$activityLevel;		break;
		}
	}
	
	private function calculateCaloriesFemale($weight, $age)
	{
		if($age < 17) 				{ return (($weight*13.4) + 692); 	}
		if($age >= 17 && $age < 30) { return (($weight*14.8) + 487); 	}
		if($age >= 30 && $age < 60) { return (($weight*8.3)  + 846);  	}
		if($age >= 60 && $age < 75) { return (($weight*9.8)  + 687); 	}
		if($age >= 75) 				{ return (($weight*8.3)  + 624); 	}
	}
	
	private function calculateCaloriesMale($weight, $age)
	{
		if($age < 17) 				{ return (($weight * 17.7) + 657); 	} 
		if($age >= 17 && $age < 30) { return (($weight * 15.1) + 692); 	} 
		if($age >= 30 && $age < 60) { return (($weight * 11.5) + 873); 	} 
		if($age >= 60 && $age < 75) { return (($weight * 11.9) + 700); 	} 
		if($age >= 75) 				{ return (($weight * 8.3) + 820);	}
	}
	
	private function calculateProtein($weight)
	{
		$this->proteinRequirement = $weight * 0.17 * 6.25;
	}
	
	private function calculateFluid($weight)
	{
		if($weight <= 60) 	{ $this->fluidRequirement = $weight * 30; } 
		else 				{ $this->fluidRequirement = $weight * 35; }		
	}	
	
	public function getCalorieRequirement()
	{
		return $this->calorieRequirement;
	}
	public function getProteinRequirement()
	{
		return $this->proteinRequirement;
	}
	
	public function getFluidRequirement()
	{
		return $this->fluidRequirement;
	}
}
?>